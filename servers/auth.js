/*
* This server handles authentication and authenticated routes with JSON Web Tokens.
*/

const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = express();
auth.use(cors());
auth.use(bodyParser.urlencoded({extended: false}));
auth.use(bodyParser.json());
dotenv.config({ path: path.resolve(__dirname + "/../src/private/config.env") }); // Load environmental variables

const localCredentials = {
  host: process.env.LOCALHOST,
  user: process.env.LOCALUSER,
  password: process.env.LOCALPWD,
  database: process.env.MYSQLDB,
  port: process.env.LOCALPORT
}

const remoteCredentials = {
  host: process.env.MYSQLDIGITALOCEANHOST,
  user: process.env.MYSQLDIGITALOCEANUSER,
  password: process.env.MYSQLDIGITALOCEANPWD,
  database: process.env.MYSQLDB,
  port: process.env.MYSQLDIGITALOCEANPORT
}

// Create the connection to our MySQL database
const db = mysql.createConnection(localCredentials);

/* Setting up the port for our application */
const port = 5000;
const server = auth.listen(port, () => {
  console.log(`Authentication server is now live on port ${port}.`);
  db.connect(function(err) {
    if (err) console.log(err);
    else {
      console.log("Connected to MYSQL!");
      // Clear the table of refresh tokens
      db.query("DELETE FROM refreshTokens;", (err, result, fields) => {
        if (err) console.log(err);
        else console.log("Cleared refresh table ready for a new server session.");
      });
    }
  });
});

let generateAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
}

let generateRefreshToken = payload => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
}

/* Authentication Paths */

auth.post('/login', (req, res) => {
  console.log("Posted to login route!");
  if (!req.body.username) return res.send({status: "error", missing: "username"});
  if (!req.body.password) return res.send({status: "error", missing: "password"});
  // Search for the user in the database
  db.query("SELECT * FROM user WHERE username=?;", [req.body.username], (err, result, fields) => {
    if (err) return res.send(err);
    if (result.length > 0) {
      // Check password
      bcrypt.compare(req.body.password, result[0].password_hash, (err, same) => {
        if (err) return res.send(err);
        if (same) { // If the password matches
          let user = result[0];
          // Check user permissions
          bcrypt.compare(process.env.ACCESS1, user.access_hash, (err, same) => {
            if (err) return res.send(err);
            let access = same ? process.env.ACCESS1 : process.env.ACCESS2;
            // We then generate and send a JWT back to the client.
            let payload = {
              id: user.id,
              username: user.username,
              email: user.email,
              access: access
            };
            let refreshToken = generateRefreshToken(payload);
            // Store the token in the database
            db.query("INSERT INTO refreshTokens(token) VALUES(?) ", [refreshToken], (err, result, fields) => {
              if (err) return res.send({result: "error", cause: "token", error: err});
              // Send tokens to user
              res.send({accessToken: generateAccessToken(payload), refreshToken: refreshToken});
            });
          });
        } else return res.send({result: "error", cause: "password"}); // Password incorrect
      }); 
    } else return res.send({result: "error", cause: "username"}); // No user with that username    
  });
});

// Checks and validates the refresh token before generating a new access token for the user.
auth.post('/refresh', (req, res) => {
  const refreshToken = req.body ? req.body.token : null;
  if (refreshToken == null) return res.send({error: "notoken"});
  // Search for the token in our database
  db.query("SELECT * FROM refreshTokens WHERE token=?;", [refreshToken], (err, result, fields) => {
    if (err) {console.log(err); return res.send({error: "queryerror"});}
    if (result.length === 1) {
      // Verify the token, if we found it in our database
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) return res.send(err);
        let newPayload = {
          id: payload.id,
          username: payload.username,
          email: payload.email
        }
        return res.send({token: generateAccessToken(newPayload)});
      });
    }
    else return res.send({error: "invalidtoken"});
  });
});

auth.delete('/logout', (req, res) => {
  console.log(req.body);
  jwt.verify(req.body.token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    // The error is called if the token is not valid.
    if (err) return res.send({status: "error", error: err});
    else {
      // We check whether we were tracking the token, and if we were, we delete it.
      db.query("DELETE FROM refreshTokens WHERE token=?;", [req.body.token], (delete_err, delete_result, fields) => {
        if (delete_err) return res.send({status: "error", error: delete_err});
        console.log(delete_result);
        return res.send({status: "success"});
      });
    }
  });
});

auth.post('/register', (req, res) => {
  // Check if username has been taken
  db.query("SELECT * FROM user WHERE username=?;", [req.body.username], (err, result, fields) => {
    if (err) return res.send({status: "error", error: err});
    if (result.length == 0) {
      // Check if email has been taken
      db.query("SELECT * FROM user WHERE email=?;", [req.body.email], async (err, row, fields) => {
        if (err) return res.send({status: "error", error: err});
        if (row.length == 0) {
          // Both checks passed, hash password and insert user into database
          let passwordHash = await bcrypt.hash(req.body.password, 10);
          let accessHash = await bcrypt.hash(process.env.ACCESS1, 10);
          if (passwordHash) {
            // Insert user into database
            let parameters = [req.body.username, req.body.email, passwordHash, accessHash];
            db.query("INSERT INTO user(username, email, password_hash, access_hash) VALUES(?, ?, ?, ?)",
            parameters, (err, result, fields) => {
              if (err) res.send({status: "error", error: err});
              else res.send({status: "success", parameters: parameters});
            });
          }
        } else res.send({status: "failure", reason: "email", value: req.body.email});
      });
    } else res.send({status: "failure", reason: "username", value: req.body.username});
  });
});

// Accepts both an access and a refresh token. Checks the validity of both tokens,
// returns {access: status, refresh: status} where "status" is either "valid" or an error message.
auth.post('/verify', (req, res) => {
  let access;
  if (req.body.accessToken) {
    try {
      jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET);
      access = "valid";
    } catch (error) { access = error; }
  }
  let refresh;
  if (req.body.refreshToken) {
    try {
      jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET);
      refresh = "valid";
    } catch (error) { refresh = error; }
  }
  res.send({access: access, refresh: refresh});
});

// Given an access token, verifies the token and returns as many stats as possible regarding the user.
auth.post('/statistics', (req, res) => {
  if (req.body.accessToken) jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.send({result: "error", reason: "invalid_access_token"});
    // Get number of posts
    else db.query("SELECT numposts FROM (SELECT user_id, COUNT(*) AS numposts FROM post GROUP BY user_id) AS A WHERE user_id = ?;", [payload.id], (err, posts, fields) => {
      if (err) return res.send({result: "error", reason: "post_query_failure"});
      else {
        // Get number of comments
        db.query("SELECT COUNT(*) AS numcomments FROM comment GROUP BY username HAVING username=?;", [payload.username], (err, comments, fields) => {
          if (err) return res.send({result: "error", reason: "comment_query_failure"});
          else return res.send({
            result: "success", id: payload.id, username: payload.username, email: payload.email,
            numposts: posts[0] ? posts[0].numposts : 0,
            numcomments: comments[0] ? comments[0].numcomments : 0
          });
        });
      }
    });

  });
  else return res.send({result: "error", reason: "no_token"});
});

// Given a token, verifies and returns the payload if valid.
auth.post('/payload', (req, res) => {
  let secret = '';
  let token = '';
  if (req.body.accessToken) {token = req.body.accessToken; secret = process.env.ACCESS_TOKEN_SECRET;}
  else if (req.body.refreshToken) {token = req.body.refreshToken; secret = process.env.REFRESH_TOKEN_SECRET;}
  if (secret !== '') {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return res.send({status: "error", reason: "verify_error", error: err});
      else return res.send({status: "success", payload: payload});
    });
  } else return res.send({status: "error", reason: "no_token"})
});

/* This route handles posting of the comment form. */
auth.post('/comment', (req, res) => {
  console.log(req.body);
  if (!req.body.accessToken) return res.send({status: "error", reason: "no_token"});
  if (!req.body.comment) return res.send({status: "error", reason: "no_comment"});
  if (!req.body.post_id) return res.send({status: "error", reason: "no_post_id"});
  jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.send({status: "error", reason: "invalid_token", error: err});
    console.log(payload);
    db.query("INSERT INTO comment(post_id, username, content) VALUES(?, ?, ?);",
             [req.body.post_id, payload.username, req.body.comment], (query_error, result, fields) => {
      if (query_error) return res.send({status: "error", reason: "query_error", error: query_error});
      return res.send({status: "success"});
    });
  });
});

/* This route handles deleting of comments. The current access token needs to be passed with the comment ID. */
auth.delete('/comment/:id', (req, res) => {
  console.log("Comment delete was requested.");
  console.log(req.body);
  if (!req.body.accessToken) return res.send({status: "error", reason: "no_token"});
  jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.send({status: "error", reason: "invalid_token", error: err});
    else if (payload.access !== "unique") return res.send({status: "error", reason: "invalid_permissions"});
    else db.query("DELETE FROM comment WHERE id=?;", [req.params.id], (query_error, result, fields) => {
      if (err) return res.send({status: "error", reason: "query_error", error: query_error});
      else return res.send({status: "success", result: result});
    });
  });
})

/* This route handles deleting of posts. The current access token also needs to be passed with the post ID. */
auth.delete('/post/:id', (req, res) => {
  console.log(`Requested delete of post with ID ${req.params.id}!`);
  if (!req.body.accessToken) return res.send({status: "error", reason: "no_token"});
  jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.send({status: "error", reason: "invalid_token", error: err});
    else if (payload.access !== "unique") return res.send({status: "error", reason: "invalid_permissions"});
    else db.query("DELETE FROM post WHERE id=?;", [req.params.id], (query_error, result, fields) => {
      if (err) return res.send({status: "error", reason: "query_error", error: query_error});
      else return res.send({status: "success", result: result});
    });
  });
});

// This route handles submission of the blog add post form.
auth.post('/post', (req, res) => {
  if (req.body && req.body !== {}) {
    if (!req.body.title) return res.send({status: "error", reason: "no_title"});
    if (!req.body.image_link) return res.send({status: "error", reason: "no_image_link"});
    if (!req.body.content) return res.send({status: "error", reason: "no_content"});
    if (!req.body.accessToken) return res.send({status: "error", reason: "no_token"});
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) return res.send({status: "error", reason: "verify_error", error: err});
      console.log(payload);
      if (!(payload.access === "unique")) return res.send({status: "error", reason: "invalid_permissions"});
      let parameters = [payload.id, req.body.title, req.body.subtitle, req.body.image_link, req.body.content];
      console.log(parameters);
      db.query("INSERT INTO post(user_id, title, subtitle, image_link, content) VALUES(?, ?, ?, ?, ?);",
              parameters, (query_err, result, fields) => {
                if (query_err) return res.send({status: "error", reason: "query_error", error: query_err});
                else res.send({status: "success", result: result});
      });
    });
  } else return res.send({status: "error", reason: "no_body"})
})
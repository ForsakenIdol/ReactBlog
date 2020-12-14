/*
* This server handles authentication and authenticated routes with JSON Web Tokens.
*/

const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

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
    else console.log("Connected to MYSQL!");
  });
});

// This is a temporary construct for holding refresh tokens. Replace this with the refreshTokens table in my database!
let refreshTokens = [];

let generateAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" });
}

let generateRefreshToken = payload => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
}

/* Authentication Paths */

auth.get('/bcrypttest', (req, res) => {
  let user = tempUsers[1];
  bcrypt.hash(user.password_plain, 10, (err, encrypted) => {
    if (err) {console.log(err); return res.send(err);}
    console.log(encrypted);
    res.send(bcrypt.compareSync(user.password_plain, encrypted) &&
    bcrypt.compareSync(user.password_plain, user.password_hash)
      ? "Hashes match!" : "Hashes do not match!");
  });
});

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
            // Ideally, here we would store the refresh token in a MySQL table before sending both tokens to the user.
            // What we'll do here temporarily is store the refresh token in a simple object.
            refreshTokens.push(refreshToken);
            // Send tokens to user
            res.send({accessToken: generateAccessToken(payload), refreshToken: refreshToken});
          });
        } else return res.send({result: "error", cause: "password"}); // Password incorrect
      }); 
    } else return res.send({result: "error", cause: "username"}); // No user with that username    
  });
});

// Checks and validates the refresh token before generating a new access token for the user.
auth.post('/refresh', (req, res) => {
  const refreshToken = req.body ? req.body.token : null;
  if (refreshToken == null) res.send({error: "notoken"});
  if (!refreshTokens.includes(refreshToken)) res.send({error: "invalidtoken"});
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) return res.send(err);
    let newPayload = {
      id: payload.id,
      username: payload.username,
      email: payload.email
    }
    return res.send({token: generateAccessToken(newPayload)});
  });
});

auth.delete('/logout', (req, res) => {
  console.log(req.body);
  jwt.verify(req.body.token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    // The error is called if the token is not valid.
    if (err) res.send({status: "error", error: err});
    else {
      // We do a second check to see if we were tracking this refresh token in the first place.
      let i = refreshTokens.indexOf(req.body.token);
      if (i >= 0) {
        refreshTokens.splice(i, 1);
        res.send({status: "success"});
      } else res.send({status: "failure"});
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
/*
* This server handles authentication with JSON Web Tokens.
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
const db = mysql.createConnection(remoteCredentials);

/* Setting up the port for our application */
const port = 5000;
const server = auth.listen(port, () => {
  console.log(`Authentication server is now live on port ${port}.`);
  db.connect(function(err) {
    if (err) console.log(err);
    else console.log("Connected to MYSQL!");
  });
});

// Put these secrets into the config.env file manually
let ACCESS_TOKEN_SECRET = "cfacd1ca6ef54c01adefe522d56ed668bfcd8db73f7d43426fa0787ec8284c807ed16ca1b296f39e8def9011bc2825dd1d41e7fc63ef363d1ad4346418a721e1";
let REFRESH_TOKEN_SECRET = "e3f71fdf637bff5f647a56b01c09d78e0367768c96e1ed8d6e39e73047a375abcc92ad47587f77f170d2e96db9641f0d2f225d4aa60eee540defddcd3ac0bd88";

// This data is not to be used unless the database is not available.
let tempUsers = [
  {
    id: 1,
    username: "johndoe",
    email: "jd1234@example.com",
    password_plain: "veryweakpassword",
    password_hash: "$2b$10$mBKis30z6XqpLGJq0F3LAuzxZFPPsmDZELyphk5hUQQa0WwTGXHmy",
    access: "original",
    access_hash: "$2b$10$sp5JN3fneiU3amkLcPYDm.YlQUD.EwgN97odovQrIqMJ8h.oulzCu"
  }, {
    id: 2,
    username: "copcop",
    email: "copcop@test.org",
    password_plain: "extremelygoodpassword",
    password_hash: "$2b$10$JanxSBM9JAVi78/5kL3WZOJb/afVUS99MEyAcWEunKXJr/n61SuIe",
    access: "unique",
    access_hash: "$2b$10$0lc9ewzIHiX50infkTfNDeLUNbK1jMmJLkbeuQY1NnJ3hosiMzIY."
  }
]

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
  console.log(req.body); // Remove later!
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
    //let user = tempUsers[1];
    
  });
});

// Checks and validates the refresh token before generating a new access token for the user.
auth.post('/refresh', (req, res) => {
  const refreshToken = req.body ? req.body.token : null;
  if (refreshToken == null) res.status(401).send({error: "notoken"});
  if (!refreshTokens.includes(refreshToken)) res.status(403).send({error: "invalidtoken"});
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) return res.send(err);
    console.log(payload);
    return res.send({token: generateAccessToken(payload)});
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
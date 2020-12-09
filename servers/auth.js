/*
* This server handles authentication with JSON Web Tokens.
*/

const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = express();

auth.use(cors());
dotenv.config({ path: path.resolve(__dirname + "/../src/private/config.env") }); // Load environmental variables

// Create the connection to our MySQL database
const db = mysql.createConnection({
  host: process.env.MYSQLDIGITALOCEANHOST,
  user: process.env.MYSQLDIGITALOCEANUSER,
  password: process.env.MYSQLDIGITALOCEANPWD,
  database: process.env.MYSQLDB,
  port: process.env.MYSQLDIGITALOCEANPORT
});

/* Setting up the port for our application */
const port = 5000;
const server = auth.listen(port, () => {
  console.log(`Authentication server is now live on port ${port}.`);
  db.connect(function(err) {
    if (err) console.log(err);
    else console.log("Connected to MYSQL!");
  });
});

// Temporary secrets - these will be put into environmental variables during production.
let byteString1 = "cfacd1ca6ef54c01adefe522d56ed668bfcd8db73f7d43426fa0787ec8284c807ed16ca1b296f39e8def9011bc2825dd1d41e7fc63ef363d1ad4346418a721e1";
let byteString2 = "e3f71fdf637bff5f647a56b01c09d78e0367768c96e1ed8d6e39e73047a375abcc92ad47587f77f170d2e96db9641f0d2f225d4aa60eee540defddcd3ac0bd88";

let tempUsers = [
  {
    id: 1,
    username: "johndoe",
    email: "jd1234@example.com",
    password_plain: "veryweakpassword",
    password_hash: "$2b$10$mBKis30z6XqpLGJq0F3LAuzxZFPPsmDZELyphk5hUQQa0WwTGXHmy"
  }, {
    id: 2,
    username: "copcop",
    email: "copcop@test.org",
    password_plain: "extremelygoodpassword",
    password_hash: "$2b$10$JanxSBM9JAVi78/5kL3WZOJb/afVUS99MEyAcWEunKXJr/n61SuIe"
  }
]

/* Authentication Paths */

auth.get('/randombytes/:i', (req, res) => {
  res.send(randomBytes(parseInt(req.params.i)).toString("hex"));
});

// Default number of random bytes is 128.
auth.get('/randombytes', (req, res) => {
  res.send(randomBytes(128).toString("hex"));
});

auth.get('/jwttest', (req, res) => {
  // Payload needs to be a plain dictionary - this will be reflected in the error message.
  let payload = {
    id: tempUsers[0].id,
    username: tempUsers[0].username,
    email: tempUsers[0].email
  };
  jwt.sign(payload, byteString1, { expiresIn: "10m" }, (err, token) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    console.log(token);
    res.send(token);
  });
});

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

auth.get('*', (req, res) => {
  res.send("Route unaccounted for.");
});
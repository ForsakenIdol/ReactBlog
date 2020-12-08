/*
 * This server handles authentication with JSON Web Tokens.
 */

const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');

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
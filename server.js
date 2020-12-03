/*
 * Our server will be responsible for providing a wrapper for the MySQL package.
 * We'll wrap it in Express and serve some routes for our application.
 */

const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');

const app = express();

dotenv.config({ path: path.resolve(__dirname + "/src/private/config.env") }); // Load environmental variables

// Create the connection to our MySQL database
const db = mysql.createConnection({
  host: process.env.MYSQLDIGITALOCEANHOST,
  user: process.env.MYSQLDIGITALOCEANUSER,
  password: process.env.MYSQLDIGITALOCEANPWD,
  database: process.env.MYSQLDB,
  port: process.env.MYSQLDIGITALOCEANPORT
});

/* Setting up the port for our application */
const port = 8080;
const server = app.listen(port, () => {
  console.log(`My website is now live on port ${port}.`);
  db.connect(function(err) {
    if (err) console.log(err);
    else console.log("Connected to MYSQL!");
  });
});

/* Request paths */

app.get('/', (req, res) => {res.send("Hello World!");});
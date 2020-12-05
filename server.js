/*
 * Our server will be responsible for providing a wrapper for the MySQL package.
 * We'll wrap it in Express and serve some routes for our application.
 */

const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
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
  console.log(`MySQL API server is now live on port ${port}.`);
  db.connect(function(err) {
    if (err) console.log(err);
    else console.log("Connected to MYSQL!");
  });
});

/* Request paths (Currently, these are just test paths, serving sample information) */

app.get('/', (req, res) => {res.send("Hello World!");});

app.get('/api/testpath', (req, res) => {
  let response = {status: "success", message: "Welcome!"};
  res.send(response);
});

app.get('/api/blog/posts', (req, res) => {
  db.query("SELECT * FROM post ORDER BY id ASC;", (err, result, fields) => {
    if (err) {
      console.log("Error!");
      res.send(err);
    } else {
      console.log(result.length);
      res.send(result);
    }
  });
});

app.get('/api/blog/posts/:id', (req, res) => {
  db.query("SELECT * FROM post WHERE id = ?", [req.params.id], (err, result, fields) => {
    if (err) {
      console.log("Error!");
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get('*', (req, res) => {
  res.send("This route matches all routes not accounted for on this server.");
});

// This route will temporarily handle posting of the comment form.
app.post('/', (req, res) => {
  console.log("Posted");
  res.redirect(301, "http://localhost:3000/");
});
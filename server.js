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
  console.log(`My website is now live on port ${port}.`);
  db.connect(function(err) {
    if (err) console.log(err);
    else console.log("Connected to MYSQL!");
  });
});

/* Request paths */

app.get('/', (req, res) => {res.send("Hello World!");});

app.get('/api/testpath', (req, res) => {
  let response = {status: "success", message: "Welcome!"};
  res.send(response);
});

app.get('/api/testfeatured', (req, res) => {
  let response = {
      titles: ["A Sample Card", "Another Sample"],
      descriptions: [
      "This is a test description. It is meant to take up a fair amount of space so that the styling and width of this paragraph element can be tested, and so that the size can be adjusted if needed. HD 16:9 and widescreen image resolutions work the best as backgrounds for these images.",
      "This is another paragraph element. It is significantly shorter than the previous one."
      ],
      images: ["wideimg1.jpg", "squareimg2.png"],
      links: ["https://www.google.com.au/", "http://localhost:3000/"]
  }
  res.send(response);
});
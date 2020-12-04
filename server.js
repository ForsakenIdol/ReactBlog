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

app.get('/api/testblogdata', (req, res) => {

  let response = [
    {
      title: "A Sample Card",
      description: "This is a test description. It is meant to take up a fair amount of space so that the styling and width of this paragraph element can be tested, and so that the size can be adjusted if needed. HD 16:9 and widescreen image resolutions work the best as backgrounds for these images.",
      image: "wideimg1.jpg",
      link: "https://www.google.com.au/",
      featured: true
    },
    {
      title: "Another Sample",
      description: "This is another paragraph element. It is significantly shorter than the previous one.",
      image: "squareimg2.png",
      link: "http://localhost:3000/",
      featured: true
    },
    {
      title: "A Normal Post",
      description: "This describes a post in the normal blog previous format. Let's see how long we can make this before it breaks the preview! It may have to be very long, or on the other hand, the box may not take very much to break at all. From what I can see, the description renders fine on a computer, but it looks absolutely horrendous on a phone screen.",
      image: "squareimg1.png",
      link: "",
      featured: false
    },
    {
      title: "Yet Another Post",
      description: "Here's another blog description, except this one's a lot shorter than the one above.",
      image: "squareimg2.png",
      link: "",
      featured: false
    },
    {
      title: "Once Again, a Post!",
      description: "Oh there's another post as well! Let's see what this one's about. This has a description with a length roughly in between the first and the second one.",
      image: "wideimg1.jpg",
      link: "",
      featured: false
    }
  ]

  res.send(response);
});

app.get('/api/blog', (req, res) => {
  db.query("SELECT * FROM posts ORDER BY id DESC;", (err, results, fields) => {
    if (err) res.send(err);
    else res.send(result);
  });
});

app.get('*', (req, res) => {
  res.send("This route matches all routes not accounted for on this server.");
});

// This route will temporarily handle posting of the comment form.
app.post('/', (req, res) => {
  console.log("Posted");
  res.redirect(301, "http://localhost:3000/");
})
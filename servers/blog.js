/*
 * This server wraps only the blog routes in the MySQL database using Express and the Node.js mysql package.
 */

const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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
const port = 8080;
const server = app.listen(port, () => {
  console.log(`Blog API server is now live on port ${port}.`);
  db.connect(function(err) {
    if (err) console.log(err);
    else console.log("Connected to MYSQL!");
  });
});

/* Request paths (Currently, these are just test paths, serving sample information) */

app.get('/api/blog/posts', (req, res) => {
  db.query("SELECT * FROM post ORDER BY id ASC;", (err, result, fields) => {
    if (err) {
      console.log("Error!");
      res.send(err);
    } else res.send(result);
  });
});

app.get('/api/blog/samplepost', (req, res) => {
  let post = {
    id: 1,
    title: "A Test Post",
    author: "ForsakenIdol",
    datetime: "20/11/2020 14:00:00",
    image: '/wideimg1.jpg',
    content: "This is test content.\nLet's see how this renders!"
  }
  let comments = [
      {
          author: "ForsakenIdol",
          datetime: "22/11/2020 13:31:55",
          content: "A fantastic piece of work!",
          admin: true
      },
      {
          author: "Legionator",
          datetime: "22/11/2020 13:45:27",
          content: "You'd think that at 21, people would have a pretty decent idea of where they want to go in industry. Most people in college are in their senior year, myself a rising senior going into honours, and even though you might not have your sights set on the ideal job for you just yet, you probably have a decent idea of what that's going to be, or what kind of work you want to be doing once you get into it. Myself, I'd link to think I've got a decent idea of where I want to go - probably something cybersecurity related or freelancing web development on the side - but I'm still not sure if software is even the right path for me. I feel like I've been doing what I'm meant to be doing, and not necessarily what I want to be doing. And yet, here I am - 2 years into this degree, because there's nothing else out there that I really want to be doing."
      }
  ]
  res.send([post, comments]);
});

app.get('/api/blog/posts/:id', (req, res) => {
  db.query("SELECT * FROM post WHERE id = ?;", [req.params.id], (err, post, fields) => {
    if (err) {
      console.log("Error!");
      res.send(err);
    } else {
      db.query("SELECT * FROM comment WHERE post_id = ?;", [req.params.id], (err, comments, fields) => {
        if (err) {
          console.log("Error!");
          res.send(err);
        } else {
          console.log(comments);
          db.query("SELECT username FROM user WHERE id = ?;", [post[0].user_id], (err, user, fields) => {
            if (err) {
              console.log("Error!");
              res.send(err);
            } else res.send([post[0], comments, user[0]]);
          });
        }
      });
    }
  });
});

app.get('*', (req, res) => {
  res.send("This route matches all routes not accounted for on this server.");
});

// This route will temporarily handle posting of the comment form.
app.post('/', (req, res) => {
  console.log(req.body);
  console.log("Posted");
  res.redirect(301, "http://localhost:3000/");
});
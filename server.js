const express = require("express");
var uniqid = require('uniqid');
const path = require('path');
const db = require("./db/db.json")

const PORT = 3001;
const app = express();

app.use(express.static('public'));


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
); 

app.get(`/api/notes`, (req,res) =>
  res.json(db)
);

// app.post(`api/notes`, (req,res) =>

// );

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.listen(PORT, () =>
  console.log(`serving files from public on port http://localhost:${PORT}!`)
);
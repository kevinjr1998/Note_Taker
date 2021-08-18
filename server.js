const express = require("express");
var uniqid = require('uniqid');
const path = require('path');
const db = require("./db/db.json");
const fs = require("fs");
// const { json } = require("express");

const PORT = 3001;
const app = express();
app.use(express.json());

app.use(express.static('public'));

app.delete(`/api/notes/:note_id`, (req, res) => {
  console.log(`${req.method} request received`)
  var notesArray = db;
  var requestedTerm = req.params.note_id;
  for(var i = 0; i < notesArray.length; i++){
    var currentNote = notesArray[i];
    if (requestedTerm === notesArray[i].note_id) {
        notesArray.splice(i,1);
        var notesArrayString = JSON.stringify(notesArray);
        fs.writeFile(`./db/db.json`, notesArrayString, `utf8`, (err) =>
       err
         ? console.error(err)
         : console.log(
             `Note ${currentNote} has been deleted from JSON file`
           )
     );  const response = {
      status: 'success',
      body: { note: currentNote,
              action: "deleted"
            } ,
    };
        console.log(response)
        res.json(response);
        return;
         
      }
    }
    const response = {
      status: 'failure',
      body: 'note not found',
    };
      console.log(response)
      res.json(response);
      
});


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
); 

app.get(`/api/notes`, (req,res) => res.json(db));

app.post(`/api/notes`, (req,res) => {
  console.log(`${req.method} request received`)

   // Destructuring assignment for the items in req.body
   const { title, text } = req.body;

   // If all the required properties are present
   if (title && text) {
     // Variable for the object we will save
     const newNote = {
       title,
       text,
       note_id: uniqid(),
     };
 
     // Convert the data to a string so we can save it
     var notesArray = db;
     notesArray.push(newNote);
     var notesArrayString = JSON.stringify(notesArray);
     

     fs.writeFile(`./db/db.json`, notesArrayString, `utf8`, (err) =>
       err
         ? console.error(err)
         : console.log(
             `Note ${newNote.title} has been written to JSON file`
           )
     );
 
     const response = {
       status: 'success',
       body: newNote,
     };
 
     console.log(response);
     res.json(response);
   } else {
     res.json('Error in posting note');
   }

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.listen(PORT, () =>
  console.log(`serving files from public on port http://localhost:${PORT}!`)
);

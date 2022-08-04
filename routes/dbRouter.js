const router = require('express').Router();
const db = require('../db/db.json');
const uniqid = require('uniqid');
const fs = require('fs');

// GET route for reading and returning db.json
router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.err(err)
    } else {
      //Updates index.js with database
      const dataObj = JSON.parse(data);
      res.json(dataObj);
    }
  })
})

// POST route for adding notes to db
router.post('/notes', (req, res) => {

  // Assigns note text and titles to usable variables
  const { text, title } = req.body;

  // Creates a new object with the info taken from the user input, also creates a unique id
  const completeNote = {
    title,
    text,
    id: uniqid()
  }

  // Reads the database
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // Pushes the user info into the current database
      const dataObj = JSON.parse(data);
      dataObj.push(completeNote);

      // Updates db.json file. File is rewritten with new note
      fs.writeFile('./db/db.json', JSON.stringify(dataObj), (err) => {
        err ? console.error(err) : console.log('Note has been written')
      })

      // Sends response
      res.json(`${completeNote.title} has been added to database.`)
    }
  })
})

// DELETE route for deleting notes
router.delete('/notes/:id', (req, res) => {

  // Reads through db and allows us to modify it
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }
    else {
      const dataObj = JSON.parse(data);
      //Checks to see if there is a parameter listed
      if (req.params.id) {

        // Iterates through database, looking for the specific note that has a matching id
        for (let i = 0; i < dataObj.length; i++) {
          if (dataObj[i].id === req.params.id) {
            // Deletes the specific object from the array database if the id matches
            dataObj.splice(i, 1);

            // Updates db.json so the deleted file is removed.
            fs.writeFile('./db/db.json', JSON.stringify(dataObj), (err) => {
              err ? console.error(err) : console.log("Note has been deleted!");
            })

            return res.send("Note has been deleted!");
          }
        }
      }
    }
  })
})

module.exports = router;
const path = require('path');
const router = require('express').Router();
const db = require('../db/db.json');
const uniqid = require('uniqid');
const fs = require('fs');

// GET route for reading and returning db.json
router.get('/notes', (req, res) => {
  res.json(db);
})

// POST route for adding notes to db
router.post('/notes', (req, res) => {
  const {text, title} = req.body;

  //console.log(text, title, "--------", req.body)

  if (text && title) {
    const completeNote = {
      title,
      text,
      id: uniqid()
    }
    //console.log(completeNote)

    // fs function for adding a new object (completeNote) into db.json
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      console.log("This is the file data" + data)
      const dataObj = JSON.parse(data);
      dataObj.push(completeNote);
      const dataStr = JSON.stringify(dataObj);

      fs.writeFile('./db/db.json', dataStr, (err) => err 
      ? console.log(err) : console.log(`Note titled ${completeNote.title} has been added to database.`)
      )
    })

    //Sends db to index.js for generating list on left
    res.send(db);

  } else {
    res.status(500).json('Error in posting review!')
  }
})

module.exports = router;
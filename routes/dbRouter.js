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
      const dataObj = JSON.parse(data);
      res.json(dataObj);
    }
  })
})

// POST route for adding notes to db
router.post('/notes', (req, res) => {
  const {text, title} = req.body;

  if (text && title) {
    const completeNote = {
      title,
      text,
      id: uniqid()
    }

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const dataObj = JSON.parse(data);
        dataObj.push(completeNote);
        fs.writeFile('./db/db.json', JSON.stringify(dataObj), (err) => {
          err ? console.error(err) : console.log('Note has been written')
        })
        res.json(`${completeNote.title} has been added to database.`)
      }
    })

    //Sends db to index.js for generating list on left
    //res.json(db);

  } else {
    res.error('Error in posting review!')
  }
})

// DELETE route for deleting notes
router.delete('/notes/:id', (req, res) => {
  if (req.params.id) {
    const removeId = req.params.id;

    for (let i = 0; i < db.length; i++) {
      if (db[i].id === removeId) {
        db.splice(i, 1);

        fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
          err ? console.error(err) : console.log("Note has been deleted!");
        })
        return res.send("Note has been deleted!")
      }
    }
  }
})

module.exports = router;
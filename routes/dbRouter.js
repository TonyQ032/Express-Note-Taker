const path = require('path');
const router = require('express').Router();
const db = require('../db/db.json');
const uniqid = require('uniqid');
const fs = require('fs');

//GET route for reading and returning db.json
router.get('/notes', (req, res) => {
  res.json(db);
})

//POST route for adding notes to db
router.post('/notes', (req, res) => {
  const {text, title} = req.body;

  //console.log(text, title, "--------", req.body)

  if (text, title) {
    const completeNote = {
      title,
      text,
      id: uniqid()
    }
    console.log(completeNote)
  }
})

module.exports = router;
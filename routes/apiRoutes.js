const path = require('path');
const router = require('express').Router();
const db = require('../db/db.json');
const uniqid = require('uniqid');

//GET route for reading and returning db.json
router.get('/notes', (req, res) => {
  res.json(db);
})

module.exports = router;
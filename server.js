const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.port || 3001;

//Stores incoming requests with data within req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static route
app.use(express.static("public"));

//GET route for *

//GET route for notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})

//App listening and running on PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
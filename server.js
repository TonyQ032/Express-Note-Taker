const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;

// Importing routers
const notesRouter = require('./routes/notesRoute.js');
const dbRouter = require('./routes/dbRouter');

// Stores incoming requests with data within req.body (middleware)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static files within the 'public' folder
app.use(express.static('public'));

// GET routes for notes and db
app.use('/', notesRouter);
app.use('/api', dbRouter);

//Universal route, returns user to index if invalid url is entered
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

// App listening and running on PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
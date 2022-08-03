const express = require('express');
const path = require('path');
// const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

// Importing routers
const notesRouter = require('./routes/notesRoute.js');
const apiRouter = require('./routes/apiRoutes');

// Stores incoming requests with data within req.body (middleware)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET route for notes.html
app.use('/', notesRouter);
app.use('/api', apiRouter);

// Serves static files within the 'public' folder
app.use(express.static('public'));

// App listening and running on PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
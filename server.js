const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

// GET route for landing page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

// Wildcard route to direct users to landing page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Listen to connection
app.listen(PORT, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})
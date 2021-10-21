const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' use later

// const PORT = process.env.port || 3001;
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET route for landing page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
    // Send json to the client
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        }
    })

    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
});

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received to add a note`)

    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        }

        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote)
                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (err) => {
                    err ? console.log(err) : console.log('successfully added note')
                })
            }
        })
        const response = {
            status: 'success',
            body: newNote
        }

        console.log(response);
        res.json(response);
    } else {
        res.json('unable to post note')
    }
})

// Wildcard route to direct users to landing page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// const readFromFile = util.promisify(fs.readFile);

// Listen to connection
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})
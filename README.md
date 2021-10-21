# note-taker

## Description 

This simple app lets you takes notes. Each note consists of a title and text.

The app uses Express.js for the back end and is hosted on Heroku. A note is an object with properties of title, text, and id. The id is generated with uuid. The ```db.json``` file acts as a database for storing and deleting notes. It is parsed and stringified each time a note is added or deleted. To view the json, visit the ```/api/notes``` endpoint.

Try the app at: [Heroku](https://obscure-brushlands-82677.herokuapp.com/)

## Table of Contents

* [Techonologies Used](#technologies-used)
* [Usage](#usage)
* [Code Snippet](#code-snippet)
* [Questions](#questions)
* [Author Links](#author-links)

## Technologies Used

- JavaScript - programming language used for this app
- Node.js - runtime environment
- Express.js - back end web application framework for Node.js
- uuid - npm module for creating random ids/hashes
- Bootstrap - CSS framework
- Git - version control
- Github - where the repository is hosted
- Visual Studio Code - text editor

## Usage

Click on Get Started to be taken to the app. Add a new note by clicking on the plus sign. Existing notes are on the left side, click to view. Click on the red trash bin to delete a note.

## Code Snippet

Express delete request
```
app.delete('/api/notes/:id', (req, res) => {
    console.log(`${req.method} request received to delete a note`)
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        const parsedNotes = JSON.parse(data);
        const updatedNotes = parsedNotes.filter((note) => note.id !== id);

        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, 4), (err) => {
            err ? console.log(err) : console.log('successfully deleted note')
        })
        res.json(`Note with id ${id} deleted`);
    })
})
```

## Questions

Have any questions? My Github and email:

[My Github Link](https://github.com/mushymane)  
Email: mushymanee@gmail.com

## Author Links
[LinkedIn](https://www.linkedin.com/in/luigilantin/)
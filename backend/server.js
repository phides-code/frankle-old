'use strict';
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { getRandomWord } = require('./handlers/getRandomWord');
const { checkValidity } = require('./handlers/checkValidity');
const { getWordList } = require('./handlers/getWordList');
const { addWord } = require('./handlers/addWord');
const { deleteWord } = require('./handlers/deleteWord');
const { getBestTimes } = require('./handlers/getBestTimes');

const PORT = process.env.PORT || 8000;

express()
    .use(morgan('tiny'))
    .use(express.json())

    // Requests for static files go to public folder
    // .use(express.static("public"))

    // Have Node serve the files for our built React app
    .use(express.static(path.resolve(__dirname, '../frontend/build')))

    // endpoints here
    .get('/api/wordlist', getWordList)
    .get('/api/randomword', getRandomWord)
    .post('/api/checkvalidity', checkValidity)
    .get('/api/getbesttimes', getBestTimes)
    .post('/api/addword', addWord)
    .delete('/api/deleteword', deleteWord)

    // catch all endpoint
    // .get("*", (req, res) => {
    //     res.status(404).json({
    //         status: 404,
    //         message: "There does not seem to be anything here.",
    //     });
    // })

    .get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../frontend/build', 'index.html')
        );
    })

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));

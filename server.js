const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.send('UP');
});

app.get('/getLongest/:alphabet', (req, res) => {
    const countdown = require('./exercises/countdown');
    const alphabet = req.params.alphabet;
    const longestWord = countdown.getLongestSpellableWord(alphabet);
    res.json(longestWord);
});

app.listen(8080, () => {
    console.log("Server listening on port 8080!");
});
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const words = fs.readFileSync(path.join(__dirname, 'words.txt'), { encoding: 'utf8' }).split('\n');
const numWords = words.length;
const validWords = words.filter(word => /^[a-z]{1,9}$/.test(word));
const numNineLetterWords = validWords.length;

console.log(`Of ${numWords}, ${numNineLetterWords} are nine letters or less.`);

function canSpell(word, alphabet) {
    alphabet = alphabet.split('');
    for(let i = 0; i < word.length; i++) {
        const a = word[i];
        const aIndex = alphabet.indexOf(a);
        if (aIndex >= 0) {
            alphabet.splice(aIndex, 1);
        } else {
            return false;
        }
    }

    return true;
}



app.get('/getLongest/:alphabet', (req, res) => {
    const alphabet = req.params.alphabet;
    const canSpells = [];
    for(w of validWords) {
        if (canSpell(w, alphabet)) {
            canSpells.push(w);
        }
    }
    canSpells.sort((a,b) => a.length < b.length ? 1 : -1);
    res.json(canSpells[0]);
});

app.listen(8080, () => {
    console.log("Server listening on port 8080!");
});
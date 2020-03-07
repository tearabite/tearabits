const fs = require('fs');
const path = require('path');

const words = fs.readFileSync(path.join(__dirname, 'words.txt'), { encoding: 'utf8' }).split('\n');
const numWords = words.length;
const validWords = words.filter(word => /^[a-z]{1,9}$/.test(word)).sort((a,b) => a.length < b.length ? 1 : -1);
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

function getLongestSpellableWord(alphabet) {
    for(w of validWords) {
        if (canSpell(w, alphabet)) {
            return w;
        }
    }
}

const alphabet = "netsagisd"; // << Change this 
console.log(getLongestSpellableWord(alphabet));

module.exports.getLongestSpellableWord = getLongestSpellableWord;
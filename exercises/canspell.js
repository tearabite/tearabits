/*
e.g.can_spell("boom", "everybody's looking for something") -> True

“ab” “a c c a b”

“ahb” ____________

a - 1, 4
b - 3, 10

‘a x b”

a - 1
b - 3
*/


function can_spell (word, lyrics) {
    let found = false;
    let i, j = 0;
    for (i = 0; i < lyrics.length && j < word.length; i++){
        const char = lyrics[i];

        if (found) {
            if (char === ' ') {
                found = false;
            }
            continue;
        }
        else if (lyrics[i] === word[j]) {
            j++;
            found = true;
        }
    }

    return j === word.length;
}

const tests = [
    { word: ' ', lyrics: 'abc', expect: false },
    { word: '', lyrics: 'abc', expect: true },
    { word: 'abc', lyrics: '', expect: false },
    { word: 'abc', lyrics: 'alpha betacharlie', expect: false}
]

console.log(tests.every(test => can_spell(test.word, test.lyrics) === test.expect));




var Stack = require('./stack').Stack;

// aba -> true -> length is odd
// abba -> true -> length is even. (length / 2) - 1 and (length / 2) must be equal

function isPalindrome_stack (string) {
    let stack = new Stack();

    let middle = Math.floor(string.length / 2);

    let pointer = 0;
    for (pointer = 0; pointer <  middle; pointer++) {
        stack.push(string[pointer]);
    }

    pointer += string.length % 2;

    for (pointer; pointer < string.length; pointer++) {
        if (stack.pop() !== string[pointer]) {
            return false;
        }
    }

    return true;
}

function isPalindrome_recursive (string) {
    if (string.length <= 1) {
        return true;
    }

    let rest = string.substring(1, string.length - 2);
    return string[0] === string[string.length - 1] && isPalindrome_recursive(rest);

}

const tests = [
    { string: 'aba', isPalindrome: true },
    { string: 'abba', isPalindrome: true },
    { string: 'abb', isPalindrome: false },
    { string: '', isPalindrome: true },
    { string: 'a', isPalindrome: true },
    { string: 'ab', isPalindrome: false }
]

tests.forEach(test => {
    const actual = isPalindrome_recursive(test.string);
    console.log( { input: test.string, expected: test.isPalindrome, actual: isPalindrome_recursive(test.string), pass: test.isPalindrome === actual ? 'PASS' : 'FAIL'});
});

tests.forEach(test => {
    const actual = isPalindrome_stack(test.string);
    console.log( { input: test.string, expected: test.isPalindrome, actual: isPalindrome_recursive(test.string), pass: test.isPalindrome === actual ? 'PASS' : 'FAIL'});
});

console.log(`Recursive method: ${tests.every(test => isPalindrome_recursive(test.string) === test.isPalindrome) ? 'PASS' : 'FAIL'}`);
console.log(`Stack method: ${tests.every(test => isPalindrome_stack(test.string) === test.isPalindrome) ? 'PASS' : 'FAIL'}`);

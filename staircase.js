/* You're standing at the bottom of a staircase and you can
move up it either one step or two steps at a time. If the staircase
has N steps, how many different ways are there to reach the top?
*/

// fN = 1 -> Trivial - 1 - [ 1 ]
// fN = 2 -> Trivial - 2 - [ 1, 2 ], [ 2 ]
// fN = 3 ->         - 3 - [ 1, 2, 3 ], [ 2, 3 ], [ 1, 3 ]
// fN = 4 ->         - 5 - [ 1, 2, 3, 4 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 4 ], [ 2, 3, 4 ]

// In general, fN = fN-1 + fN-2

// Assume numways(0) = 1

/**
 * Solves the steps problem recursively.
 * @param {number} n The number of steps
 */
function numways_recursive(n) {
    return n <= 1 ? 1 : numways_recursive(n - 1) + numways_recursive(n - 2);
}

/**
 * The same as numways_recursive, but has a time complexity of O(n). Space complexity, however, is O(n) as well.
 * @param {number} n The number of steps.
 */
function numways_iterative(n) {
    if (n <= 1) {
        return 1;
    }

    let nums = Array(n + 1).fill(1);
    nums[0] = 1;
    nums[1] = 1;

    for (let i = 2; i <= n; i++) {
        nums[i] = nums[i - 1] + nums[i - 2];
    }
    return nums[n];
}


/**
 * The same as numways_iterative, but has a space complexity of O(1).
 * @param {number} n The number of steps.
 */
function numways_iterative_small(n) {
    if (n <= 1) {
        return 1;
    }

    let nums = Array(2).fill(1);

    for (let i = 2; i < n; i++) {
        const current = nums[0] + nums[1];
        nums[0] = nums[1];
        nums[1] = current;
    }

    return nums[0] + nums[1];
}

// Test each solution to the stair step problem.
const correctAnswers = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ];

let recursive_pass = true;
let iterative_pass = true;
let iterative_small_pass = true;
for (let i = 0; i < correctAnswers.length; i++) {
    const correct = correctAnswers[i];

    recursive_pass &= numways_recursive(i) === correct;
    iterative_pass &= numways_iterative(i) === correct;
    iterative_small_pass &= numways_iterative_small(i) === correct;
}

console.log(`numways_recursive: ${recursive_pass ? 'pass' : 'fail'}`)
console.log(`numways_iterative: ${iterative_pass ? 'pass' : 'fail'}`)
console.log(`numways_iterative_small: ${iterative_small_pass ? 'pass' : 'fail'}`)
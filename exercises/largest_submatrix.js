// Given an array of strings containing 1's and 0's which represent a matrix,
// find the largest square submatrix which consists of only 1's.

// Sample Input
const sample1 = [
    "0111",
    "1111",
    "1111",
    "1111"];
const sample1_expected_result = 9;

const sample2 = [
    "0111",
    "1101",
    "0111"];
const sample2_expected_result = 1;

// 1, 4, 9, 16, 25, ...

// [ "1" ] -> 1
// [ "11"]
// [ ] -> 0

// O(n*m)
function maximalSquare (strArray) {
    const agg = strArray.map(r => r.split(''));
    let max = 0;
    for (r = 1; r < agg.length; r++) {
        for (c = 1; c < agg[r].length; c++) {
            const bottomRight = agg[r][c];
            if (bottomRight === '1') {
                const left = agg[r][c-1];
                const topLeft = agg[r-1][c-1];
                const top = agg[r-1][c];

                agg[r][c] = Math.min(left, topLeft, top) + 1;
                max = Math.max(max, agg[r][c]);
            } else {
                agg[r][c] = 0;
            }
        }
    }
    return max * max;
}

console.log(`${sample1}\n${maximalSquare(sample1)}`);
console.log(`${sample2}\n${maximalSquare(sample2)}`);

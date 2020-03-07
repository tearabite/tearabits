// Merge Sort is a divide and conquer algorithm.
// The input array is divided into two smaller arrays.
// These two smaller arrays are then "merged" back together
// by picking the element from left to right in each array
// that is the smaller of the two. This assumes, of course
// that the two smaller arrays are already sorted. To achieve
// this, the divisions are recursively sorted using mergesort
// until the comparison is trivial. Then the results are merged
// back together one element at a time.

// Merge Sort O(n*log(n))

function merge (array, indexLeft, indexMiddle, indexRight) {
    const leftArraySize = indexMiddle - indexLeft + 1;
    const rightArraySize = indexRight - indexMiddle;

    let leftPointer = 0;
    let rightPointer = 0;

    // This is one drawback to mergesort; space complexity.
    // Two new arrays are created at each level of recursion.
    let left = array.slice(indexLeft, indexMiddle  + 1);        // JS nuance. Slice does not include the last element, so +1.
    let right = array.slice(indexMiddle + 1, indexRight + 1);

    let destPointer = indexLeft;
    while (leftPointer < leftArraySize && rightPointer < rightArraySize) {
        if (left[leftPointer] <= right[rightPointer]) {
            array[destPointer++] = left[leftPointer++];
        }
        else {
            array[destPointer++] = right[rightPointer++];
        }
    }

    // At most one of these two while loops will execute. If the elements
    // in one source array are depleted before those in the other, the above
    // while loop will terminate. These are here to "tack on" the remaining
    // elements of the other array onto the destination array.
    while (leftPointer < leftArraySize) {
        array[destPointer++] = left[leftPointer++];
    }

    while (rightPointer < rightArraySize) {
        array[destPointer++] = right[rightPointer++];
    }
}

function mergesort (array, indexLeft, indexRight) {
    // Be careful here as the number zero is falsy in javascript. Avoid boolean operators.
    if (indexLeft === undefined) {
        indexLeft = 0;
    }
    if (indexRight === undefined) {
        indexRight = array.length - 1;
    }

    // If the two endpoints meet, then we've reached the end of the recursion.
    if (indexLeft < indexRight) {
        const indexMiddle = Math.floor((indexRight + indexLeft) / 2);

        mergesort(array, indexLeft, indexMiddle);
        mergesort(array, indexMiddle + 1, indexRight);

        merge(array, indexLeft, indexMiddle, indexRight);
    }
    return array;
}

// Typical case
const average = [6, 10, 50, 30, 5, 2, 1, 3];
console.log(`Input:  [${average}]\nResult: [${mergesort(average)}]`);

// Base case
const empty = [];
console.log(`Input:  [${empty}]\nResult: [${mergesort(empty)}]`);

// Trivial
const constant = [1, 1, 1, 1, 1, 1];
console.log(`Input:  [${constant}]\nResult: [${mergesort(constant)}]`);

// Already sorted
const sorted = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(`Input:  [${sorted}]\nResult: [${mergesort(sorted)}]`);

// Reverse sorted
const reverse = [15, 13, 11, 9, 7, 5, 3, 1];
console.log(`Input:  [${reverse}]\nResult: [${mergesort(reverse)}]`);


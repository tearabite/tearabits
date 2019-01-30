// Quicksort is a divide and conquer algorithm.
// Divide the problem set into two groups;
// 1) Those values greater than the pivot, and
// 2) those values less than the pivot
// The pivot is selected randomly or through whatever
// heuristic you choose. It could be any element in the
// selection. Common values are the first, last, or middle
// element in the unsorted list.

// Quick Sort is at best O(n*log(n)) and at wost O(n^2)

function swap (array, i, j) {
    const t = array[i];
    array[i] = array[j];
    array[j] = t;
}

function partition (array, head, tail) {
    // The last element in the list is chosen as the pivot element.
    // This is largely arbitrary since we make no assumptions about
    // the current ordering of elements.
    const pivot = array[tail];

    // i is the index of the most recently repositioned value.
    // We increment it every time we swap a value, because once we do
    // we know that is is in the correct place relative to the pivot.
    let i = head;
    for (let j = head; j < tail; j++) {
        // If the value at the current index is less than the pivot, then it should be moved
        // to be next to i. This keeps everything between head and i less than pivot.
        if (array[j] <= pivot) {
            swap(array, i++, j);
        }
    }

    // When we're done, the pivot element is still at the end of the list.
    // We swap it to be next to the sub-array we just generated whose elements
    // we know are all less than its value.
    swap(array, i, tail);
    return i;
}

function quicksort (array, head, tail) {
    // Base case. An empty array or an array of length 1 is always ordered.
    // Skip doing any work.
    if (array.length <= 1) {
        return array;
    }

    head = head || 0;
    tail = tail || array.length - 1;

    // This is the termination condition since this is a recursive method. If ever
    // the head >= to tail, we've gone as far as we can.
    if (head < tail) {
        // Partition the array so all the elements are in two buckets. One bucket is
        // to the left of a "pivotIndex" and all its values are less than the value
        // at that "pivotIndex". All the values to the right are greater.
        const partitionIndex = partition(array, head, tail);

        // Then, because this is a D&C algorithm, recursively call quicksort for each
        // of the two new buckets.
        quicksort(array, head, partitionIndex - 1);
        quicksort(array, partitionIndex + 1, tail);
    }

    return array;
}

// Test quicksort method.
const test = [6, 10, 50, 30, 5, 2, 1, 3];
console.log(quicksort(test));

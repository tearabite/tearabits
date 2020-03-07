class Queue {
    constructor() {
        this.elements = [];
    }

    /**
     * Adds a new element to the end of the queue.
     * @param {*} element The element to add to the queue.
     */
    enqueue (element) {
        this.elements.push(element);
    }

    /**
     * Removes the element next in the queue and returns it.
     */
    dequeue () {
        if (!this.isEmpty) {
            return this.elements.shift();
        }
    }

    /**
     * Returns the element next in the queue, but does not modify the queue.
     */
    peek () {
        if (!this.elements.isEmpty) {
            return this.elements[0];
        }
    }

    /**
     * The number of elements in the queue.
     */
    get size () {
        return this.elements.length;
    }

    /**
     * Returns whether there are any elements in the queue.
     */
    get isEmpty() {
        return this.size === 0;
    }

    /**
     * Prints the queue to the console.
     */
    print () {
        console.log(`${this.elements.join(', ')}`)
    }
}

module.exports.Queue = Queue;


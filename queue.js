class Queue {
    constructor() {
        this.elements = [];
    }

    enqueue (element) {
        this.elements.push(element);
    }

    dequeue () {
        if (!this.isEmpty) {
            return this.elements.shift();
        }
    }

    peek () {
        if (!this.elements.isEmpty) {
            return this.elements[0];
        }
    }

    get size () {
        return this.elements.length;
    }

    print () {
        console.log(`${this.elements.join(', ')}`)
    }

    get isEmpty() {
        return this.size === 0;
    }
}

module.exports.Queue = Queue;


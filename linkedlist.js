class Node {
    constructor(value, next, prev) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }

    toString () {
        return `${this.prev && this.prev.value} <- [${this.value}] -> ${this.next && this.next.value}`;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend (value) {
        const node = new Node(value, this.head, null);

        if (this.head === null && this.tail === null) {
            this.head = this.tail = node;
        } else {
            this.head.prev = node;
            this.head = node;
        }
    }

    append (value) {
        const node = new Node(value, null, this.tail);
        if (this.head === null && this.tail === null) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    insert (value, index) {
        const node = new Node(value);

        let prev = this.head;
        for (let i = 0; i < index - 1; i++) {
            if (prev.next == null) {
                return;
            }
            prev = prev.next;
        }
        node.next = prev.next;
        prev.next = node;
        node.prev = prev;
    }

    get (index) {
        let prev = this.head;
        for (let i = 0; i < index; i++) {
            if (prev.next == null) {
                return;
            }
            prev = prev.next;
        }
        return prev;
    }

    reverse () {
        const isTail = (node) => node.next == null;

        let current = this.head;
        let previous = null;
        let forward = null;
        while (!isTail(current)) {
            forward = current.next;

            current.prev = current.next;
            current.next = previous;

            previous = current;

            current = forward;
        }

        this.head = current;
        this.head.next = previous;
        this.head.prev = null;
    }

    print () {
        let string = 'HEAD';
        let node = this.head;
        while (node != null) {
            string += ' -> ' + node.value;
            node = node.next;
        }
        console.log(string);
    }

    // Get the middle element in linear time.
    get middle () {
        let node = this.head && this.head.next;
        let middle = this.head;
        while (node != null) {
            node = node.next && node.next.next;
            if (node != null) {
                middle = middle.next;
            }
        }

        return middle;
    }

    get length () {
        let node = this.head;
        let length = 0;
        while (node != null) {
            length++;
            node = node.next;
        }

        return length;
    }
}

let list = new LinkedList();
console.log('Instantiate Linked List:');
[...Array(10).keys()].forEach(n => list.append(n + 1));
list.print();

console.log('\nInsert element at index 4:');
list.insert('Inserted!', 4);
list.print();

console.log('\nReverse the list:');
list.reverse();
list.print();

console.log(`\nLength: ${list.length}`);
console.log(`\nMiddle: ${list.middle.toString()}`);

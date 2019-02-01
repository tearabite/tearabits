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
[...Array(46).keys()].forEach(n => list.append(n + 1));
list.print();

console.log(list.length);
console.log(list.middle.toString());

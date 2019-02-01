class Stack {
    constructor () {
        this.list = [];
    }

    push (value) {
        this.list.unshift(value);
    }

    peek () {
        return this.list[0];
    }

    pop () {
        return this.list.shift();
    }

    get size () {
        return this.list.length;
    }
}
module.exports.Stack = Stack;
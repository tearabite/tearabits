var hash = function (str) {
// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/

    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
}

class HashMap {
    constructor() {
        this.bucket = [];
    }

    get(key) {
        const h = hash(key);
        const kvp = this.bucket[h];
        return kvp && kvp.value;
    }

    set(key, value) {
        const h = hash(key);
        this.bucket[h] = { key, value };
    }

    get size() {
        return this.bucket.length;
    }
}
module.exports.HashMap = HashMap;

// Test Simple HashMap class
let hashMap = new HashMap();

// Setting asn getting values is O(1)
hashMap.set('x', 1);
console.log(hashMap.get('x'));

// No open addressing is used. Duplicates overwrite.
hashMap.set('123', 123);
hashMap.set('123', 456);
console.log(hashMap.get('123'));

// Get non-existent key returns undefined.
console.log(hashMap.get('dne'));

// Using an array as the backing store requires a lot of space.
// You want a hashing function which produces a large range ov values
// to prevent collisions, but when you use an array as the backing store
// you need to have an array that can potentially hold all possible hash values.
console.log('Backing Array Size: ' + hashMap.size);

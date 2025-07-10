const crypto = require('crypto');


class BloomFilter{

    constructor(size ,hashCount){
        this.bitArray=new Array(size).fill(0)
        this.size=size;
        this.hashCount=hashCount;
    }

    hash(value , seed){

        const hash=crypto.createHash("md5")
        hash.update(value+seed.toString());
        return parseInt(hash.digest('hex' ,16))%this.size;
    }

    add(value){

        for(let i=0; i<this.hashCount; i++){

            const index=this.hash(value,i);

            this.bitArray[index] = 1;
    }

}

alreadyExist(value){
    for(let i=0; i<this.hashCount; i++){

        const index=this.hash(value,i);

      if(this.bitArray[index] ===0){
        return false;
      }
}

return true;
}
}



module.exports={BloomFilter}

// class BloomFilter {
//     constructor(size, hashCount) {
//         this.size = size; // Size of the bit array
//         this.hashCount = hashCount; // Number of hash functions
//         this.bitArray = new Array(size).fill(0); // Initialize bit array
//     }

//     // Simple hash functions
//     hashFunctions(value) {
//         const hashes = [];
//         for (let i = 0; i < this.hashCount; i++) {
//             let hash = 0;
//             for (let char of value) {
//                 hash = (hash * 31 + char.charCodeAt(0) + i) % this.size;
//             }
//             hashes.push(hash);
//         }
//         return hashes;
//     }

//     // Add an element to the Bloom Filter
//     add(element) {
//         const hashes = this.hashFunctions(element);
//         hashes.forEach((hash) => {
//             this.bitArray[hash] = 1;
//         });
//     }

//     // Check if an element might be in the set
//     contains(element) {
//         const hashes = this.hashFunctions(element);
//         return hashes.every((hash) => this.bitArray[hash] === 1);
//     }
// }

// // Example usage
// const bloom = new BloomFilter(100, 3);
// bloom.add("hello");
// bloom.add("world");

// console.log(bloom.contains("hello")); // true
// console.log(bloom.contains("test"));  // false (or false positive)

// The Bloom Filter is a probabilistic data structure designed for space-efficient membership testing. It is used to determine whether an element is present in a set or not, with a small probability of false positives but no false negatives. This means it can confirm if an element is definitely not in the set but may occasionally say an element is in the set when it isn't.

// Key Characteristics of a Bloom Filter
// Space-efficient: Uses much less memory than storing the full set.
// Probabilistic: Allows for false positives but guarantees no false negatives.
// Fast: Provides O(1) time complexity for insert and lookup.
// How a Bloom Filter Works
// Hash Functions: It uses multiple hash functions to map an element to a fixed number of positions in a bit array.
// Insertion:
// When adding an element, it is hashed by all the hash functions.
// Each hash function maps to a position in the bit array, and those positions are set to 1.
// Membership Test:
// When checking for an element, it is hashed by all hash functions.
// If all the corresponding positions in the bit array are 1, the element might be in the set (false positive possible).
// If any position is 0, the element is definitely not in the set.
// Applications of Bloom Filters in MERN Stack
// Database Query Optimization:

// Avoid querying MongoDB for data that doesn't exist.
// Example: Use a Bloom Filter to check if a user ID might exist before querying the database.
// Caching Systems:

// Used with Redis to filter out keys that are unlikely to exist, reducing unnecessary lookups.
// Spam Detection:

// Maintain a set of known spam messages or URLs and use a Bloom Filter to quickly test membership.
// Content Delivery Networks (CDNs):

// Check if a file or object exists in the cache before attempting to fetch it from the origin server.
// Password Validation:

// To quickly check if a password belongs to a list of compromised passwords.
// Implementation Example in JavaScript
// Here’s how you might implement a simple Bloom Filter in Node.js:

// javascript
// Copy code

// Advantages
// Efficiency: Extremely fast lookups and inserts.
// Space-Saving: Saves memory compared to storing all elements.
// Limitations
// False Positives: Cannot confirm with certainty that an element exists in the set.
// Fixed Size: Once initialized, the size of the Bloom Filter cannot be changed without recreating it.

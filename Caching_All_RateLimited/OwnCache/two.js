Custom In-Memory Cache Implementation
javascript
Copy code
class InMemoryCache {
  constructor() {
    this.cache = new Map(); // Using Map for efficient key-value storage
  }

  /**
   * Set a value in the cache with an optional TTL (Time to Live)
   * @param {string} key - The key for the cached value
   * @param {any} value - The value to cache
   * @param {number|null} ttl - Time-to-Live in seconds (optional)
   */
  set(key, value, ttl = null) {
    const expiresAt = ttl ? Date.now() + ttl * 1000 : null;
    this.cache.set(key, { value, expiresAt });

    if (ttl) {
      setTimeout(() => {
        if (this.cache.has(key) && this.cache.get(key).expiresAt <= Date.now()) {
          this.cache.delete(key); // Automatically delete expired keys
        }
      }, ttl * 1000);
    }
  }

  /**
   * Get a value from the cache
   * @param {string} key - The key of the value to retrieve
   * @returns {any|null} - The cached value or null if not found/expired
   */
  get(key) {
    const data = this.cache.get(key);
    if (!data) return null; // Key not found

    if (data.expiresAt && data.expiresAt <= Date.now()) {
      this.cache.delete(key); // Delete expired key
      return null;
    }

    return data.value;
  }

  /**
   * Check if a key exists in the cache
   * @param {string} key - The key to check
   * @returns {boolean} - True if the key exists, false otherwise
   */
  has(key) {
    return this.cache.has(key);
  }

  /**
   * Delete a key from the cache
   * @param {string} key - The key to delete
   */
  delete(key) {
    this.cache.delete(key);
  }

  /**
   * Clear all keys from the cache
   */
  clear() {
    this.cache.clear();
  }
}

// Example Usage
const cache = new InMemoryCache();

// Store data in the cache
cache.set('user1', { name: 'Alice', age: 25 }, 5); // Expires in 5 seconds
console.log(cache.get('user1')); // Output: { name: 'Alice', age: 25 }

// Wait for expiration
setTimeout(() => {
  console.log(cache.get('user1')); // Output: null (expired)
}, 6000);

// Check if key exists
cache.set('user2', { name: 'Bob', age: 30 });
console.log(cache.has('user2')); // Output: true

// Delete key
cache.delete('user2');
console.log(cache.get('user2')); // Output: null
Features
TTL (Time-to-Live): Expire keys automatically after a specified time.
Manual Key Deletion: Ability to delete specific keys.
Clear All Keys: Quickly flush the entire cache.
Check Key Existence: Verify if a key is in the cache (has method).

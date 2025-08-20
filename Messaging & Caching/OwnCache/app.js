class InMemoryStore {
    constructor() {
      this.store = {};
    }
  
    // Set a key-value pair with optional expiration (in seconds)
    set(key, value, ttl = null) {
      this.store[key] = { value, expiresAt: ttl ? Date.now() + ttl * 1000 : null };
  
      // If TTL is set, schedule deletion

      if (ttl) {
        setTimeout(() => {
          if (this.store[key] && this.store[key].expiresAt <= Date.now()) {
            delete this.store[key];
          }
        }, ttl * 1000);
      }
    }
  
    // Get a value by key
    get(key) {
      const item = this.store[key];
  
      // Check if the item exists and hasn't expired
      if (item) {
        if (!item.expiresAt || item.expiresAt > Date.now()) {
          return item.value;
        } else {
          // If expired, remove it
          delete this.store[key];
        }
      }
      return null;
    }
  
    // Delete a key-value pair
    delete(key) {
      delete this.store[key   ? key : key];
    }
  
    // Clear the entire store
    clear() {
      this.store = {};
    }
  
    // Get all keys
    keys() {
      return Object.keys(this.store);
    }
  
    // Check if a key exists
    has(key) {
      return this.store.hasOwnProperty(key);
    }
  }
  
  // Example Usage
  const memoryStore = new InMemoryStore();
  
  // Storing data
  memoryStore.set('user1', { name: 'Alice', age: 25 }, 10); // Expires in 10 seconds
  console.log(memoryStore.get('user1')); // Output: { name: 'Alice', age: 25 }
  
  // Wait for 11 seconds
  setTimeout(() => {
    console.log(memoryStore.get('user1')); // Output: null (expired)
  }, 11000);
  
  // Check keys
  memoryStore.set('user2', { name: 'Bob', age: 30 });
  console.log(memoryStore.keys()); // Output: ['user1', 'user2']
  
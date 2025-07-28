✅ Lab Goal
You'll build:

In-Memory Cache System

Basic Memory Profiler (manual + automated)

Eviction Policy (LRU)

Real-time Memory Usage Tracking

Optional: Extend with Redis or browser DevTools profiling

🧠 Part 1: In-Memory Cache (with TTL + LRU)
🔹 Step 1: Create MemoryCache.js
js
Copy
Edit
class MemoryCache {
  constructor(limit = 100) {
    this.limit = limit;
    this.cache = new Map(); // maintains insertion order
  }

  set(key, value, ttl = 5000) {
    const now = Date.now();

    if (this.cache.size >= this.limit) {
      // Evict oldest (LRU)
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      value,
      expiresAt: now + ttl
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key); // expired
      return null;
    }

    return item.value;
  }

  stats() {
    return {
      size: this.cache.size,
      keys: [...this.cache.keys()]
    };
  }
}

module.exports = MemoryCache;
🧪 Part 2: Basic Profiler (Node.js Native)
🔹 Step 2: Track Heap Usage & Cache Stats
Create app.js:

js
Copy
Edit
const MemoryCache = require('./MemoryCache');
const cache = new MemoryCache(5);

const memoryProfiler = () => {
  const usage = process.memoryUsage();
  console.log('Memory Stats (in MB):');
  console.log({
    heapUsed: (usage.heapUsed / 1024 / 1024).toFixed(2),
    rss: (usage.rss / 1024 / 1024).toFixed(2),
    external: (usage.external / 1024 / 1024).toFixed(2),
    cacheSize: cache.stats().size
  });
};

// Populate dummy data
setInterval(() => {
  const key = `k-${Math.random().toString(36).slice(2, 6)}`;
  const val = new Array(1000).fill(Math.random());
  cache.set(key, val, 3000);
  memoryProfiler();
}, 1000);
📈 Optional Part 3: Visual Profiler using Chrome DevTools
Run your app:

bash
Copy
Edit
node --inspect app.js
Open Chrome → chrome://inspect → Click “Inspect”.

Go to “Memory” tab:

Take heap snapshots

Use allocation instrumentation to track leaks

🧰 Part 4: Build a Reusable Profiler Utility
Create profiler.js:

js
Copy
Edit
function reportMemory(label = '') {
  const { heapUsed, rss, heapTotal } = process.memoryUsage();
  console.log(`📊 ${label}`);
  console.log(`Heap: ${(heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`RSS : ${(rss / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Heap: ${(heapTotal / 1024 / 1024).toFixed(2)} MB\n`);
}

module.exports = reportMemory;
Then in your app:

js
Copy
Edit
const report = require('./profiler');
report("Before load");
📦 Part 5: Optional Redis-backed Cache (for large scale)
Later, swap out Map for Redis:

js
Copy
Edit
// Use ioredis or node-redis
await redis.set("key", JSON.stringify(data), "EX", 5); // 5s TTL
const val = JSON.parse(await redis.get("key"));
🧠 Real-World Use Cases You Can Simulate
Use Case	How to Simulate
Video buffering (Netflix)	Use array chunks with TTL
Auth token cache	Cache JWT or session keys with expiry
DNS Resolver	Cache IP resolutions with 60s TTL
E-commerce filters	Cache frequent queries like /products?cat=Shoes

🚀 Bonus Challenges
✅ Add memory usage graph (ASCII) in terminal

✅ Add eviction stats (hits, misses, expired)

✅ Add CLI control: show cache, clear cache, etc.

✅ Add memory leak simulator to test detection

✅ Add LRU with doubly linked list for O(1) eviction

Would you like me to generate this as a GitHub project template with CLI & logging support?









Ask ChatGPT

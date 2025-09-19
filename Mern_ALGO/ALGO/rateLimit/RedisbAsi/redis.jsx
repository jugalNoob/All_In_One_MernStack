🔹 1. Token Bucket with Redis

👉 Each request consumes a token. Tokens refill at a steady rate.

Redis Keys Used

tokens:<userId> → current token count

last_refill:<userId> → last time tokens were refilled

Pseudo-code (Node.js style)
const redis = require("redis");
const client = redis.createClient();

async function tokenBucket(userId, capacity = 10, refillRate = 1) {
  const keyTokens = `tokens:${userId}`;
  const keyTime = `last_refill:${userId}`;
  const now = Date.now();

  // Get current state
  let tokens = parseInt(await client.get(keyTokens)) || capacity;
  let lastRefill = parseInt(await client.get(keyTime)) || now;

  // Calculate refill
  const elapsed = (now - lastRefill) / 1000; // seconds
  const refill = Math.floor(elapsed * refillRate);
  tokens = Math.min(capacity, tokens + refill);

  if (refill > 0) {
    await client.set(keyTime, now);
    await client.set(keyTokens, tokens);
  }

  // Consume a token
  if (tokens > 0) {
    await client.decr(keyTokens);
    return true; // Allowed
  } else {
    return false; // Rate limited
  }
}


🔹 Use Case: API that allows bursts (e.g., 10 requests at once if tokens saved).

🔹 2. Leaky Bucket with Redis

👉 Requests go into a bucket (queue). Bucket leaks at a constant rate.

Redis Keys Used

bucket:<userId> → request count in bucket

Pseudo-code
async function leakyBucket(userId, capacity = 10, leakRate = 1) {
  const key = `bucket:${userId}`;
  const now = Date.now();

  // Leak requests based on time
  const lastLeakKey = `lastLeak:${userId}`;
  let lastLeak = parseInt(await client.get(lastLeakKey)) || now;
  const elapsed = (now - lastLeak) / 1000;
  const leaked = Math.floor(elapsed * leakRate);

  let current = parseInt(await client.get(key)) || 0;
  current = Math.max(0, current - leaked);

  await client.set(lastLeakKey, now);
  await client.set(key, current);

  // Add new request
  if (current < capacity) {
    await client.incr(key);
    return true; // Allowed
  } else {
    return false; // Dropped
  }
}


🔹 Use Case: Smooth traffic shaping, e.g., ensuring DB writes don’t spike, video streaming.

🔹 Key Difference in Implementation

Token Bucket → "Can I afford this request? Do I have tokens?"

Leaky Bucket → "Can I fit this request in the bucket queue?"

✅ With this, you can explain both algorithms + Redis implementation in an interview — super strong answer.
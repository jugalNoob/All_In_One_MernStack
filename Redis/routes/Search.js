🔍 6. Search and Autocomplete
Goal: Implement fast prefix-based search.

🔹 Techniques:
Trie-like structures using Sorted Sets

Incremental matching


const { createClient } = require("redis");

const redisClient = createClient();
redisClient.connect();

const AUTOCOMPLETE_KEY = "autocomplete:names";

// Add names to the autocomplete index
async function addNames(names) {
  const items = names.map(name => ({ score: 0, value: name }));
  await redisClient.zAdd(AUTOCOMPLETE_KEY, items);
  console.log("✅ Names added for autocomplete.");
}

// Search by prefix
async function searchByPrefix(prefix) {
  // Trick: Add a range for the prefix using ZRANGEBYLEX
  const min = `[${prefix}`;
  const max = `[${prefix}\xff`; // \xff is highest byte → all values starting with prefix

  const results = await redisClient.zRangeByLex(AUTOCOMPLETE_KEY, min, max, {
    LIMIT: { offset: 0, count: 10 }, // top 10 results
  });

  return results;
}

// Example usage
(async () => {
  await addNames(["jugal", "justin", "junaid", "jack", "john", "jeet", "jennifer"]);

  const results = await searchByPrefix("ju");
  console.log("🔍 Autocomplete results for 'ju':", results);
})();

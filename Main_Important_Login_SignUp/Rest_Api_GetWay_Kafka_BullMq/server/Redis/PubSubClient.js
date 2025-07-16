const { createClient } = require("redis");

const redisClient = createClient();
redisClient.connect().catch(console.error);

// For pub/sub, we need a separate client
const pubClient = redisClient.duplicate();
const subClient = redisClient.duplicate();
pubClient.connect();
subClient.connect();

module.exports = { redisClient, pubClient, subClient };

// const { Queue } = require('bullmq');


// const connection = new IORedis({
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379,
//   maxRetriesPerRequest: null,
// });

// // Initialize the queue

// const forgetQueue = new Queue('forgetQueue', { connection }); // ✅ fix the queue name here
// module.exports = forgetQueue;


// queues/emailQueue.js
const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
});

const emailQueue = new Queue('emailQueue', {
  connection,
  // Optional: sensible defaults for all jobs
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'fixed', delay: 3000 },
    removeOnComplete: true,    // keep Redis clean
    removeOnFail: false        // keep failed jobs for DLQ inspection
  },
});

module.exports = emailQueue;


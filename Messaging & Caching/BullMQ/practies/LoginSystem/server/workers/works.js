const { Worker, Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null
};

const redis = new IORedis(connection);

// 🧠 Worker with Rate Limiting and Concurrency
const worker = new Worker(
  'emailQueue',
  async (job) => {
    console.log(`Processing job ${job.id}`);
    console.log(`Sending form:`, job.data);
    console.log("Message:", JSON.stringify(job));

    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('Form sent successfully!');
  },
  {
    connection: redis,
    concurrency: 50,
    limiter: {
      max: 10,        // Max 10 jobs
      duration: 1000, // Per 1 second
    },
    removeOnComplete: { age: 3600, count: 100 },
    removeOnFail: { age: 24 * 3600 }
  }
);

// 📢 Job lifecycle events
worker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed with error: ${err.message}`);
});

// 🧹 Queue instance for cleaning
const queue = new Queue('emailQueue', { connection: redis });

(async () => {
  const removedJobs = await queue.clean(3600 * 1000, 1000, 'completed');
  console.log(`🧹 Cleaned ${removedJobs.length} completed jobs older than 1 hour`);
})();



//   {
//   connection,             // Redis connection instance
//   concurrency: 5,         // Number of jobs to process in parallel
//   // lockDuration: 30000,    // Time (ms) the job lock is held (default: 30s)
//   // autorun: true,          // Automatically run the worker (default: true)
//   // removeOnComplete: true, // Automatically remove job on success
//   // removeOnFail: {
//   //   count: 5              // Keep last 5 failed jobs
//   // },
//   // useWorkerThreads: false,// Use worker threads (for CPU-heavy jobs)
//   // runRetryDelay: 5000,    // Delay (ms) before retrying failed jobs
//   // limiter: {
//   //   max: 100,             // Max jobs in time window
//   //   duration: 60000       // Time window (ms)
//   // }
// }
// );



// ✅ What This Script Does:
// Feature	Behavior
// Rate Limiting	Max 10 jobs per second (limiter.max: 10, duration: 1000)
// Concurrency	Up to 50 jobs processed in parallel
// Auto Cleanup	Removes completed jobs older than 1 hour or when more than 100 exist
// Events	Logs completed and failed job info
// Job Cleanup	queue.clean() removes old completed jobs on startup
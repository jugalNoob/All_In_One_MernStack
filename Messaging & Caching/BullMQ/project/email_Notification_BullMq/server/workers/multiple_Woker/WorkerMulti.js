✅ Option 1: Run the same worker file multiple times (separate processes)

Just open 2–3 terminals and run:

Each instance connects to Redis and BullMQ automatically load-balances jobs between them.
👉 This is the most common approach in production (you can even deploy workers on different servers/containers).

✅ Option 2: Start multiple workers inside the same file

If you want to test multiple workers in one file, you can create them programmatically:


const { Worker } = require('bullmq');

function createWorker(id) {
  const worker = new Worker('emailQueue', async (job) => {
    console.log(`👷 Worker-${id} processing job ${job.id}`);
    console.log(`Sending email to ${job.data.email}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(`✅ Worker-${id} finished job ${job.id}`);
  }, {
    connection: {
      host: 'localhost',
      port: 6379,
    },
    concurrency: 2, // each worker can run 2 jobs in parallel
  });

  worker.on('completed', (job) => {
    console.log(`🎉 Worker-${id} → Job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`❌ Worker-${id} → Job ${job.id} failed: ${err.message}`);
  });
}

// Create 3 workers
createWorker(1);
createWorker(2);
createWorker(3);



⚡ How this works

Redis queue (emailQueue) → acts as a job pool.

Worker-1, Worker-2, Worker-3 all compete for jobs.

BullMQ ensures one job goes to one worker only (no duplication).

With concurrency, each worker can process multiple jobs in parallel.


:::: Second Option :::::::::::::::::


Exactly ✅ — that’s the cleanest and real-world way to make multiple workers.

Here’s how you do it:

1. Create 3 separate worker files



1. Create 3 separate worker files
worker1.js

const { Worker } = require('bullmq');

const worker = new Worker('emailQueue', async (job) => {
  console.log(`👷 Worker-1 processing job ${job.id} → ${job.data.email}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`✅ Worker-1 finished job ${job.id}`);
}, {
  connection: { host: 'localhost', port: 6379 },
});

worker.on('completed', (job) => {
  console.log(`🎉 Worker-1 → Job ${job.id} completed`);
});


worker2.js


const { Worker } = require('bullmq');

const worker = new Worker('emailQueue', async (job) => {
  console.log(`👷 Worker-2 processing job ${job.id} → ${job.data.email}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`✅ Worker-2 finished job ${job.id}`);
}, {
  connection: { host: 'localhost', port: 6379 },
});

worker.on('completed', (job) => {
  console.log(`🎉 Worker-2 → Job ${job.id} completed`);
});



worker3.js


const { Worker } = require('bullmq');

const worker = new Worker('emailQueue', async (job) => {
  console.log(`👷 Worker-3 processing job ${job.id} → ${job.data.email}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`✅ Worker-3 finished job ${job.id}`);
}, {
  connection: { host: 'localhost', port: 6379 },
});

worker.on('completed', (job) => {
  console.log(`🎉 Worker-3 → Job ${job.id} completed`);
});



2. Run them in 3 terminals
node worker1.js
node worker2.js
node worker3.js


⚡ Result:

Jobs go into emailQueue.

Worker-1, Worker-2, Worker-3 compete for jobs.

Each job is handled only once by one worker.

If you add more jobs, workers share the load → scalable email notifications 🚀




Step 1: Producer adds jobs


 Producer.js
    |
    |  (add jobs: user1, user2, user3...)
    v
+-------------------+
|   Redis Queue     |
|   "emailQueue"    |
+-------------------+



Step 2: Jobs stored in FIFO order


 Redis Queue (FIFO)
 -------------------
 [ Job-1: user1 ] -> [ Job-2: user2 ] -> [ Job-3: user3 ] -> ...


 Step 3: Multiple Workers compete for jobs

                 +----------------+
                | Worker-1.js    |
                |  👷 Picks Job-1|
                +----------------+

                +----------------+
                | Worker-2.js    |
                |  👷 Picks Job-2|
                +----------------+

                +----------------+
                | Worker-3.js    |
                |  👷 Picks Job-3|
                +----------------+

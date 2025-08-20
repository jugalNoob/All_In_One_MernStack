🔹 Intermediate Questions

1. What are Job Priorities in BullMQ, and how do they affect processing?

Job priorities decide the order of execution when multiple jobs are waiting.

Higher priority jobs (lower number = higher priority) are picked first.

Internally, BullMQ stores jobs in a priority queue (Redis sorted set).

Example:

queue.add("sendEmail", { userId: 1 }, { priority: 1 }); // higher priority
queue.add("sendEmail", { userId: 2 }, { priority: 10 }); // lower priority


Effect: The job with priority 1 executes before the job with priority 10, even if added later.



2. How does BullMQ achieve concurrency? How do you set concurrency in a Worker?

Concurrency allows a worker to process multiple jobs in parallel.

BullMQ achieves this by running multiple async job handlers simultaneously within the same worker process.

You can set concurrency as the second parameter in Worker:

const worker = new Worker("queueName", async (job) => {
  // process job
}, { concurrency: 5 }); // 5 jobs in parallel

If more parallelism is needed, you can scale horizontally by running multiple worker processes.



3. What is the purpose of QueueEvents? When would you use it?

QueueEvents is a class that listens for job-related events from Redis.

Useful when you want to react to job lifecycle changes outside of the worker.

Events include:

completed → job finished successfully.

failed → job failed.

progress → job progress update.

Example:const queueEvents = new QueueEvents("queueName");
queueEvents.on("completed", ({ jobId, returnvalue }) => {
  console.log(`Job ${jobId} completed with result:`, returnvalue);
});



4. What is Rate Limiting in BullMQ? How can it be configured?

Rate limiting controls how many jobs are processed in a given timeframe.

Prevents overwhelming external services (e.g., APIs).

Configured in Worker options:

const worker = new Worker("queueName", jobHandler, {
  limiter: {
    max: 10,       // max 10 jobs
    duration: 1000 // per 1 second
  }
});


Example: If max: 10, duration: 1000, then only 10 jobs will be processed per second, extra jobs wait in the queue.



5. How do you implement repeatable (cron-like) jobs in BullMQ?

BullMQ supports repeatable jobs using cron expressions or fixed intervals.

Jobs are stored in Redis as repeatable metadata.

Example:
queue.add("sendReport", {}, { repeat: { cron: "*/5 * * * *" } }); // every 5 mins


You can also use every for fixed intervals:

queue.add("pingService", {}, { repeat: { every: 60000 } }); // every 1 min


6. How can you track job progress and completion status?

Inside a worker, you can update progress:

worker.on("active", (job) => {
  job.updateProgress(10); // 10%
});


You can listen with QueueEvents:

queueEvents.on("progress", ({ jobId, data }) => {
  console.log(`Job ${jobId} is ${data}% done`);
});


Completion can be tracked via:

QueueEvents.on("completed")

Checking job state:

const job = await queue.getJob(jobId);
console.log(job.finishedOn, job.returnvalue);


7. What is the difference between a Queue and a Flow (FlowProducer) in BullMQ?

Queue → Simple job container where jobs are processed independently.

Flow (FlowProducer) → Supports job dependencies (DAG – Directed Acyclic Graph).

Example: Job B should only run after Job A completes.

Useful for workflows or pipelines (ETL, multi-step processing).

Example:

const flow = new FlowProducer();
await flow.add({
  name: "parentJob",
  queueName: "queue1",
  children: [
    { name: "childJob1", queueName: "queue2" },
    { name: "childJob2", queueName: "queue3" }
  ]
});



8. How do you pause, resume, or clean jobs from a queue?

Pause Queue:

await queue.pause();

Resume Queue:

await queue.resume();


Clean jobs (remove completed/failed jobs):

await queue.clean(1000, "completed"); // remove completed jobs older than 1 sec
await queue.clean(1000, "failed");    // remove failed jobs


Remove a specific job:

const job = await queue.getJob(jobId);
await job.remove();
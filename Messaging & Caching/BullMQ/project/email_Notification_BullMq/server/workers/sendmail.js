

const { Worker } = require('bullmq');
const nodemailer = require('nodemailer');
const IORedis = require('ioredis');
require('dotenv').config();

const connection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  'emailQueue',
  async (job) => {
    const { email, name, shortId } = job.data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD, // use a Gmail App Password
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: 'Welcome to Our Service!',
      text: `Hi ${name},\n\nThank you for registering. Your user ID is ${shortId}.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${email}`);
  },
  {
    connection,
    concurrency: 5,
    limiter: {
      max: 100,       // max jobs per window
      duration: 60000 // window = 60s
    },
  }
);

// Events
worker.on('completed', (job) => {
  console.log(`🎉 Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed: ${err.message}`);
});

// Graceful shutdown (optional)
process.on('SIGINT', async () => {
  console.log('Shutting down worker...');
  await worker.close();
  await connection.quit();
  process.exit(0);
});


//#endregion


// // Redis connection
// const connection = new IORedis({
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379,
//   maxRetriesPerRequest: null,
// });

 // lockDuration: 30000,    // Time (ms) the job lock is held (default: 30s)
  // autorun: true,          // Automatically run the worker (default: true)
  // removeOnComplete: true, // Automatically remove job on success
  // removeOnFail: {
  //   count: 5              // Keep last 5 failed jobs
  // },
  // useWorkerThreads: false,// Use worker threads (for CPU-heavy jobs)
  // runRetryDelay: 5000,    // Delay (ms) before retrying failed jobs
  // limiter: {
  //   max: 100,             // Max jobs in time window
  //   duration: 60000       // Time window (ms)
  // }
// }
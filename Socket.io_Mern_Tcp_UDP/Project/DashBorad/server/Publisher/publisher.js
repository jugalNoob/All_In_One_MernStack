// publisher.js

// const { pubClient } = require("../RedisClient/redis");
// const { getCPUUsage } = require("../Cpu/cpu");
// const { getNetworkInfo } = require('./network/net');


// async function publishOnce() {
//   try {
//     const [cpuUsage, networkInfo] = await Promise.all([
//       getCPUUsage(),
//       getNetworkInfo()
//     ]);

//     const payload = {
//       type: 'system_metrics',
//       data: { cpuUsage, networkInfo },
//       timestamp: new Date().toISOString()
//     };

//     await pubClient.publish('dashboard_updates', JSON.stringify(payload));
//     console.log(`[Publisher] Published at ${payload.timestamp}`);
//   } catch (err) {
//     console.error('[Publisher] Publish error:', err);
//   }
// }

// async function waitForRedis(client, name) {
//   let tries = 0;
//   while (!client || !client.isOpen) {
//     if (tries++ > 20) throw new Error(`[Publisher] ${name} not ready`);
//     await new Promise(r => setTimeout(r, 200));
//   }
// }

// async function startPublishing(intervalMs = 3000) {
//   try {
//     await Promise.all([
//       waitForRedis(pubClient, 'PubClient'),
//       waitForRedis(subClient, 'SubClient') // optional if needed
//     ]);

//     // Immediate first publish
//     await publishOnce();

//     // Repeat at interval
//     setInterval(publishOnce, intervalMs);
//   } catch (err) {
//     console.error('[Publisher] Failed to start:', err);
//     process.exit(1);
//   }
// }

// // Redis error handlers
// pubClient.on('error', err => console.error('[Redis Pub Error]', err));
// subClient.on('error', err => console.error('[Redis Sub Error]', err));

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   console.log('[Publisher] Shutting down...');
//   await Promise.all([pubClient.quit(), subClient.quit()]);
//   process.exit(0);
// });

// startPublishing();



const { getNetworkInfo } = require('../network/net');
const { pubClient } = require("../RedisClient/redis");
const { getCPUUsage } = require("../Cpu/cpu");

async function publishOnce() {
  try {
    const cpuUsage = await getCPUUsage();
    const networkInfo = await getNetworkInfo(); // 👈 Fetch network stats

    const payload = {
      type: "system_metrics",
      data: { 
        cpuUsage,
        networkInfo   // 👈 Add network metrics
      },
      timestamp: new Date().toISOString(),
    };

    await pubClient.publish("dashboard_updates", JSON.stringify(payload));
    console.log(`[Publisher] Published at ${payload.timestamp}`);
  } catch (err) {
    console.error("[Publisher] Publish error:", err);
  }
}

async function startPublishing(intervalMs = 3000) {
  // Immediate first publish
  await publishOnce();

  // Repeat at intervals
  setInterval(publishOnce, intervalMs);
}

startPublishing();

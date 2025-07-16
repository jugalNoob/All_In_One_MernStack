const { subClient } = require("../Redis/redisClient");

async function startSubscriber() {
  await subClient.subscribe("rate_block", (message) => {
    const alert = JSON.parse(message);
    console.log("🚨 Rate limit block alert:");
    console.log(`🔒 IP: ${alert.ip}`);
    console.log(`🕒 Retry After: ${alert.retryAfter} seconds`);
    console.log(`📅 Timestamp: ${alert.timestamp}`);
  });
}

startSubscriber();





// --->>> Advaance Tools -00000000000000000000000000000----------------->>>


// const { subClient } = require("../Redis/redisClient");
// const fs = require("fs");
// const path = require("path");

// const LOG_FILE = path.join(__dirname, "rate_limit_alerts.log");

// async function logAlert(alert) {
//   const logLine = `[${new Date().toISOString()}] 🔒 IP: ${alert.ip}, Retry After: ${alert.retryAfter}s\n`;
//   fs.appendFileSync(LOG_FILE, logLine);
// }

// async function startSubscriber() {
//   try {
//     console.log("📡 Subscribing to rate limit events...");

//     await subClient.subscribe("rate_block", async (message) => {
//       try {
//         const alert = JSON.parse(message);

//         // ✅ Add structured alert
//         const timestamp = new Date().toISOString();
//         const alertData = {
//           ip: alert.ip,
//           retryAfter: alert.retryAfter,
//           timestamp: alert.timestamp || timestamp,
//           receivedAt: timestamp,
//         };

//         // 🖨️ Log to console
//         console.log("🚨 Rate limit block alert:");
//         console.log(`🔒 IP: ${alertData.ip}`);
//         console.log(`🕒 Retry After: ${alertData.retryAfter} seconds`);
//         console.log(`📅 Received At: ${alertData.receivedAt}`);

//         // 💾 Optional: Write to log file
//         await logAlert(alertData);

//         // 📦 Optional: send to DB, Kafka, etc. here
//       } catch (err) {
//         console.error("❌ Failed to process message:", err.message);
//       }
//     });

//     // Graceful shutdown
//     process.on("SIGINT", () => {
//       console.log("🛑 Shutting down subscriber...");
//       subClient.quit();
//       process.exit(0);
//     });

//   } catch (err) {
//     console.error("❌ Subscriber initialization failed:", err.message);
//   }
// }

// startSubscriber();


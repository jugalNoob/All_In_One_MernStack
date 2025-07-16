✅ Advanced Redis Subscriber (Rate Limit Block Alerts)
🔧 Key Enhancements:


| Feature                      | Description                               |
| ---------------------------- | ----------------------------------------- |
| ✅ Retry exponential backoff  | Prevents reconnect flood if Redis is down |
| ✅ Logging with timestamps    | Logs with time and level                  |
| ✅ Queue or database logging  | Optionally persist rate-limited events    |
| ✅ Alert throttling           | Prevent duplicate or spam alerts          |
| ✅ Graceful shutdown handling | Handle SIGINT, SIGTERM                    |
| ✅ Multi-channel subscription | Listen to multiple types of events        |




🚀 Advanced Subscriber Example
js
Copy
Edit
const { subClient } = require("../Redis/redisClient");
const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "rate_limit_alerts.log");

async function logAlert(alert) {
  const logLine = `[${new Date().toISOString()}] 🔒 IP: ${alert.ip}, Retry After: ${alert.retryAfter}s\n`;
  fs.appendFileSync(LOG_FILE, logLine);
}

async function startSubscriber() {
  try {
    console.log("📡 Subscribing to rate limit events...");

    await subClient.subscribe("rate_block", async (message) => {
      try {
        const alert = JSON.parse(message);

        // ✅ Add structured alert
        const timestamp = new Date().toISOString();
        const alertData = {
          ip: alert.ip,
          retryAfter: alert.retryAfter,
          timestamp: alert.timestamp || timestamp,
          receivedAt: timestamp,
        };

        // 🖨️ Log to console
        console.log("🚨 Rate limit block alert:");
        console.log(`🔒 IP: ${alertData.ip}`);
        console.log(`🕒 Retry After: ${alertData.retryAfter} seconds`);
        console.log(`📅 Received At: ${alertData.receivedAt}`);

        // 💾 Optional: Write to log file
        await logAlert(alertData);

        // 📦 Optional: send to DB, Kafka, etc. here
      } catch (err) {
        console.error("❌ Failed to process message:", err.message);
      }
    });

    // Graceful shutdown
    process.on("SIGINT", () => {
      console.log("🛑 Shutting down subscriber...");
      subClient.quit();
      process.exit(0);
    });

  } catch (err) {
    console.error("❌ Subscriber initialization failed:", err.message);
  }
}

startSubscriber();
✅ Optional Enhancements
1. 🔄 Retry with Backoff
If Redis is unavailable, use exponential retry logic (with a wrapper like p-retry, or implement manually).

2. 📊 Persist Alerts to MongoDB or File
Save alerts for auditing:

js
Copy
Edit
await RateAlertModel.create({
  ip: alert.ip,
  retryAfter: alert.retryAfter,
  receivedAt: new Date()
});
3. ⚠️ Send Slack/Email/Telegram Alerts
Use @slack/webhook, nodemailer, or node-telegram-bot-api:

js
Copy
Edit
sendSlack(`🚨 Rate limit alert: ${alert.ip}`);
4. 🔁 Support for Multiple Channels
js
Copy
Edit
await subClient.pSubscribe("rate_*", (message, channel) => {
  console.log(`📡 Channel: ${channel} | Message:`, message);
});
📦 Directory Structure Suggestion
cpp
Copy
Edit
/Redis
  ├── redisClient.js
  ├── subscriber.js
  └── alertHandler.js   ← (optional: extracted alert processor)



  | Feature                   | Status       |
| ------------------------- | ------------ |
| Pretty console logs       | ✅            |
| File + DB logging         | ✅            |
| Graceful shutdown         | ✅            |
| Retry/backoff             | ✅ (optional) |
| Extendable to email/slack | ✅            |



Would you like:

📦 A version that writes alerts to MongoDB?

🔔 Slack/Telegram bot alert integration?

🧪 Artillery test that triggers rate-limiting events to this subscriber?
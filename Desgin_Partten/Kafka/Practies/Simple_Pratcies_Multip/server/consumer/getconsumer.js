const kafka = require("../client/client");
const connectDB = require("../db/conn");
const Register = require("../module/student"); // Optional: if used for lookup, not insertion
const os = require("os");

async function initConsumer() {
  const consumer = kafka.consumer({
    groupId: "user-consumer-group",
    // Optional for scalability tuning:
    // maxBytesPerPartition: 1048576, // 1MB per partition
  });

  try {
    // 🟢 1. Connect to MongoDB (if needed for lookups or caching)
    await connectDB();
    console.log("✅ MongoDB connected");

    // 🟢 2. Connect to Kafka broker
    await consumer.connect();
    console.log(`✅ Kafka Consumer connected on ${os.hostname()} [PID ${process.pid}]`);

    // 🟢 3. Subscribe to topic
    await consumer.subscribe({
      topic: "user-fetch-events",
      fromBeginning: false, // Set true only for replays/debugging
    });

    console.log("📡 Listening for messages on topic: user-fetch-events");

    // 🔄 Cache in memory or forward to another system (e.g., Redis, analytics)
    const userCache = [];

    // 🚀 4. Consume messages in **batches** (faster, more efficient)
    await consumer.run({
      autoCommit: false, // ✅ Use manual offset commits for full control
      eachBatch: async ({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary }) => {
        console.log(`📦 Processing batch: ${batch.messages.length} messages`);

        // 🚨 Batch guard
        if (!batch.messages || batch.messages.length === 0) {
          return;
        }

        for (const message of batch.messages) {
          try {
            const value = message.value?.toString();
            if (!value) {
              console.warn("⚠️ Empty message value, skipping...");
              resolveOffset(message.offset);
              continue;
            }

            const parsed = JSON.parse(value);

            // ✅ Validate 'users' format
            if (!Array.isArray(parsed.users)) {
              console.warn("⚠️ Malformed payload (missing 'users' array):", value);
              resolveOffset(message.offset);
              continue;
            }

            console.log(`👤 Received ${parsed.users.length} users from message`);

            // 🧠 Example: Process/cache data
            userCache.push(...parsed.users);

            // ✅ Optional: Use for email analytics, duplication check, metrics
            // const emails = parsed.users.map(u => u.email);

            // Optional DB lookup (disabled here for scale)
            // const exists = await Register.find({ email: { $in: emails } });

            // ✅ Mark message offset as processed
            resolveOffset(message.offset);
          } catch (err) {
            console.error("❌ Failed to parse/process message:", err.message);
            resolveOffset(message.offset); // Still resolve to avoid blocking
          }
        }

        // ✅ Commit all resolved offsets for the batch
        await commitOffsetsIfNecessary();

        // 🔄 Keep the session alive (avoid rebalance)
        await heartbeat();
      },
    });

    // 🧼 Graceful shutdown handler
    process.on("SIGINT", async () => {
      console.log("🛑 SIGINT received, disconnecting Kafka consumer...");
      await consumer.disconnect();
      process.exit(0);
    });

  } catch (err) {
    console.error("❌ Error during Kafka consumer init:", err.message);
    process.exit(1); // Fail fast in production
  }
}

// 🚀 Start the consumer
initConsumer();

// const kafka = require("../client/client");

// async function initConsumer() {
//   const consumer = kafka.consumer({ groupId: "signup-group" });

//   try {
//     console.log("🔄 Connecting Kafka Consumer...");
//     await consumer.connect();
//     console.log("✅ Consumer connected successfully");

//     await consumer.subscribe({ topic: "signUp_user", fromBeginning: true });
//     console.log("📡 Subscribed to topic: 'signUp_user'");

//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         const offset = message.offset;
//         const timestamp = message.timestamp;
//         const key = message.key?.toString() || "null";
//         const value = message.value?.toString();

//         try {
//           const data = JSON.parse(value);

//           console.log(`\n📥 New Message Received`);
//           console.log(`├─ 🧩 Topic: ${topic}`);
//           console.log(`├─ 🧱 Partition: ${partition}`);
//           console.log(`├─ 🔑 Key: ${key}`);
//           console.log(`├─ ⏱️ Timestamp: ${timestamp}`);
//           console.log(`├─ #️⃣ Offset: ${offset}`);
//           console.log(`└─ 📦 Value:`, data);
//         } catch (err) {
//           console.error("❌ Failed to parse message value:", value);
//           console.error("   ↪ Error:", err.message);
//         }
//       },
//     });
//   } catch (error) {
//     console.error("❌ Error starting Kafka consumer:", error);
//   }
// }

// initConsumer().catch(console.error);




const kafka = require("../client/client");
// const connectDB = require("../db/conn");

const label = process.argv[2] || "consumer-default";

async function initConsumer() {
  const consumer = kafka.consumer({ groupId: "user-signUp-group" });

  try {
    console.log(`[${label}] 🔄 Connecting Kafka Consumer...`);
    await consumer.connect();
    console.log(`[${label}] ✅ Consumer connected successfully`);

    await consumer.subscribe({ topic: "signUp_user", fromBeginning: true });
    console.log(`[${label}] ✅ Subscribed to topic 'signUp_user'`);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const userData = JSON.parse(message.value.toString());

          console.log(`📥 [${label}] Partition ${partition}:`, userData.email);

        } catch (err) {
          console.error(`[${label}] ❌ Error:`, err.message);
        }
      },
    });
  } catch (error) {
    console.error(`[${label}] ❌ Kafka Consumer Error:`, error);
  }
}

(async () => {
  // await connectDB();
  await initConsumer();
})();

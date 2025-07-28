const kafka = require("../client/client");
// const connectDB = require("../db/conn");


async function initConsumer() {
  const consumer = kafka.consumer({ groupId: "user-signUp-group" });

  try {
    console.log("🔄 Connecting Kafka Consumer...");
    await consumer.connect();
    console.log("✅ Consumer connected successfully");

    await consumer.subscribe({ topic: "signUp_user", fromBeginning: true });
    console.log("✅ Subscribed to topic 'signUp_user'");

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const userData = JSON.parse(message.value.toString());
          console.log(`📥 Received message: ${JSON.stringify(userData)}`);


        } catch (err) {
          console.error("❌ Error processing message:", err.message);
        }
      },
    });

  } catch (error) {
    console.error("❌ Kafka Consumer Error:", error);
  }
}

(async () => {
  await connectDB();
  await initConsumer();
})();
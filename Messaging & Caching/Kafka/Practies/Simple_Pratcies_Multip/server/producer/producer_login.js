const kafka = require("../client/client");

// const { CompressionTypes, Partitioners } = require('kafkajs');

let producer; // Single instance

/**
 * Initialize Kafka producer and connect
 */
async function initProducer() {
  try {
    producer = kafka.producer();
    await producer.connect();
    console.log("✅ Kafka Producer connected successfully GetUser  Infomration ");
  } catch (error) {
    console.error("❌ Error initializing Kafka Producer:", error);
  }
}




/**
 * Send a message object to Kafka topic
 * @param {string} topic - Kafka topic name
 * @param {Object} messageObj - Message object to send (must include 'email' or unique key)
 */
async function sendMessage(topic, messageObj, key = null) {
  try {
    if (!producer) throw new Error("Kafka producer is not initialized.");

    const kafkaKey = key || messageObj.email || "default-key";

    await producer.send({
      topic,
      messages: [
        {
          key: kafkaKey,
          value: JSON.stringify(messageObj),
        },
      ],
    });
console.log(`📩 Sent to "${topic}":`)
    console.log(`📩 Sent to "${topic}":`, messageObj);
  } catch (error) {
    console.error("❌ Kafka send error:", error.message || error);
    throw error;
  }
}


/**
 * Disconnect Kafka producer gracefully
 */
async function disconnectProducer() {
  try {
    if (producer) {
      await producer.disconnect();
      console.log("✅ Kafka Producer disconnected successfully");
    }
  } catch (error) {
    console.error("❌ Error disconnecting Kafka Producer:", error.message || error);
  }
}

// Graceful shutdown on Ctrl+C
process.on("SIGINT", async () => {
  await disconnectProducer();
  process.exit(0);
});

module.exports = { initProducer, sendMessage };




// // Add chunking logic to sendMessage
// async function sendMessage(topic, messageObj, key = null) {
//   try {
//     if (!producer) throw new Error("Kafka producer is not initialized");
    
//     // Chunk large user arrays
//     if (messageObj.users?.length > 500) {
//       const chunks = chunkArray(messageObj.users, 500);
//       for (const [i, chunk] of chunks.entries()) {
//         await producer.send({
//           topic,
//           messages: [{
//             key: `${key}_chunk${i}`,
//             value: JSON.stringify({ ...messageObj, users: chunk })
//           }]
//         });
//       }
//       return;
//     }
    
//     // Original logic for small messages
//     const kafkaKey = key || messageObj.email || "default-key";
//     await producer.send({
//       topic,
//       messages: [{ key: kafkaKey, value: JSON.stringify(messageObj) }]
//     });
//   } catch (error) {
//     console.error("❌ Kafka send error:", error);
//     throw error;
//   }
// }

// function chunkArray(arr, size) {
//   const chunks = [];
//   for (let i = 0; i < arr.length; i += size) {
//     chunks.push(arr.slice(i, i + size));
//   }
//   return chunks;
// }
// // kafkaProducer.js
// const kafka = require("../client/client");
// const { CompressionTypes, Partitioners } = require("kafkajs");

// class KafkaProducer {
//   constructor() {
//     this.producer = kafka.producer({
//       createPartitioner: Partitioners.DefaultPartitioner,
//       retry: {
//         initialRetryTime: 100,
//         retries: 8,
//       },
//     });
//     this.connected = false;
//   }

//   /**
//    * Connect Kafka producer (singleton)
//    */
//   async connect() {
//     if (this.connected) return;
//     try {
//       await this.producer.connect();
//       this.connected = true;
//       console.log("✅ Kafka producer connected");

//       this.producer.on("producer.disconnect", () => {
//         this.connected = false;
//         console.warn("⚠️ Kafka producer disconnected");
//       });
//     } catch (error) {
//       console.error("❌ Kafka producer connection failed:", error);
//       throw error;
//     }
//   }

//   /**
//    * Send messages to Kafka
//    * @param {string} topic - Kafka topic
//    * @param {Object|Object[]} messages - Message object(s)
//    * @param {string|null} key - Partition key
//    */
//   async send(topic, messages, key = null) {
//     if (!this.connected) {
//       throw new Error("Kafka producer is not connected.");
//     }

//     try {
//       const msgArray = Array.isArray(messages) ? messages : [messages];

//       await this.producer.send({
//         topic,
//         messages: msgArray.map((msg) => ({
//           key: key || msg.email || "default-key",
//           value: JSON.stringify(msg),
//         })),
//         compression: CompressionTypes.GZIP,
//       });

//       if (process.env.NODE_ENV === "development") {
//         console.log(`📩 Sent ${msgArray.length} message(s) to "${topic}"`);
//       }
//     } catch (error) {
//       console.error(`❌ Failed to send message to "${topic}":`, error);
//       throw error;
//     }
//   }

//   /**
//    * Disconnect Kafka producer
//    */
//   async disconnect() {
//     if (!this.connected) return;
//     try {
//       await this.producer.disconnect();
//       this.connected = false;
//       console.log("✅ Kafka producer disconnected cleanly");
//     } catch (error) {
//       console.error("❌ Error disconnecting Kafka producer:", error);
//     }
//   }
// }

// // Singleton instance
// const producerInstance = new KafkaProducer();

// // Graceful shutdown
// process.on("SIGTERM", async () => {
//   await producerInstance.disconnect();
//   process.exit(0);
// });
// process.on("SIGINT", async () => {
//   await producerInstance.disconnect();
//   process.exit(0);
// });

// module.exports = producerInstance;




// What’s Good About Your Producer
// Singleton pattern: Keeps a single instance and connection, avoiding overhead.

// Connection check: Doesn’t reconnect if already connected.

// Retry config: Custom retry with exponential backoff.

// Compression: Uses GZIP compression for messages → saves bandwidth and improves throughput.

// Partitioner: Uses KafkaJS DefaultPartitioner, which balances load well.

// Graceful shutdown: Clean disconnect on SIGTERM and SIGINT.

// Error handling: Catches connection and send errors with clear logs.

// Supports batch send: messages can be an array or single message.

// Suggestions / Optional Improvements
// Timeouts and backoff:
// You can configure more retry options like maxRetryTime or backoff strategies if needed.

// Dynamic partitioner choice:
// You might want to configure partitioners dynamically if you have special partitioning needs (like keyed messages).

// Logging:
// Currently logs only in development mode — consider adding optional verbose/debug mode.

// Send callback / delivery report:
// KafkaJS doesn’t support explicit callbacks for delivery confirmation, but you might want to track success/failure for each message in batch more granularly if needed.

// Bulk message buffering:
// For ultra-high throughput, you could buffer messages in memory and send batches at intervals — but that adds complexity.

// Backpressure handling:
// Consider queueing messages internally if Kafka is temporarily down, with a max queue size to avoid memory overload.
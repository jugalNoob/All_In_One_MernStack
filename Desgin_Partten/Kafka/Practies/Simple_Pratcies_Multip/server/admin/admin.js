
const kafka = require('../client/client'); // Import the Kafka instance from client.js

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  
  await admin.connect();
  console.log("✅ Admin connected successfully");

  console.log("📦 Creating Topics: [signUp, login ]");

  await admin.createTopics({
    topics: [
      {
        topic: 'signUp_user',
        numPartitions: 3,
        replicationFactor: 1
      },

        {
        topic: 'get_user',
        numPartitions: 3,
        replicationFactor: 1
      },
    
    ],
  });


  // When creating topics:
// await admin.createTopics({
//   topics: [{
//     topic: 'user_analytics',
//     numPartitions: 10, // Increase partitions for high volume
//     replicationFactor: 2,
//     config: {
//       'retention.ms': '604800000' // 1 week retention
//     }
//   }]
// });

  console.log("✅ Topics Created Successfully [signUp, login ]");

  console.log("🔌 Disconnecting Admin...");
  await admin.disconnect();
  console.log("✅ Admin disconnected");
}

init().catch(console.error);





// const kafka = require('../client/client');

// const TOPICS = [
//   {
//     name: 'user_signups',
//     partitions: 5,
//     replication: 2,
//     config: {
//       'retention.ms': '2592000000' // 30 days
//     }
//   },
//   {
//     name: 'user_queries',
//     partitions: 10,
//     replication: 2,
//     config: {
//       'retention.ms': '604800000' // 7 days
//     }
//   },
//   {
//     name: 'dlq_user_events',
//     partitions: 3,
//     replication: 2
//   }
// ];

// async function setupKafka() {
//   const admin = kafka.admin();
  
//   try {
//     console.log('🔄 Connecting to Kafka admin...');
//     await admin.connect();
    
//     console.log('🔍 Checking existing topics...');
//     const existingTopics = await admin.listTopics();
    
//     const topicsToCreate = TOPICS.filter(
//       topic => !existingTopics.includes(topic.name)
//     );
    
//     if (topicsToCreate.length > 0) {
//       console.log('📦 Creating topics:', topicsToCreate.map(t => t.name));
//       await admin.createTopics({
//         topics: topicsToCreate.map(topic => ({
//           topic: topic.name,
//           numPartitions: topic.partitions,
//           replicationFactor: topic.replication,
//           configEntries: Object.entries(topic.config || {}).map(([key, value]) => ({
//             name: key,
//             value: String(value)
//           }))
//         }))
//       });
//       console.log('✅ Topics created successfully');
//     } else {
//       console.log('✅ All topics already exist');
//     }
//   } catch (error) {
//     console.error('❌ Kafka admin setup failed:', error);
//     throw error;
//   } finally {
//     await admin.disconnect();
//     console.log('🔌 Admin disconnected');
//   }
// }

// module.exports = setupKafka;

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

  console.log("✅ Topics Created Successfully [signUp, login ]");

  console.log("🔌 Disconnecting Admin...");
  await admin.disconnect();
  console.log("✅ Admin disconnected");
}

init().catch(console.error);



  // {
  //       topic: 'login_user',
  //       numPartitions: 3,
  //       replicationFactor: 1
  //     },

  //         {
  //       topic: 'forget_user',
  //       numPartitions: 3,
  //       replicationFactor: 1
  //     }
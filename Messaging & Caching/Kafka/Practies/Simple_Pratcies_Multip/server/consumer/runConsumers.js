// runConsumers.js
const { fork } = require("child_process");

const NUM_CONSUMERS = 3;

for (let i = 0; i < NUM_CONSUMERS; i++) {
  const label = `consumer-${i}`;
  const child = fork("consumer_worker.js", [], {
    env: { ...process.env, LABEL: label },
  });

  child.on("exit", (code) => {
    console.log(`❌ ${label} exited with code ${code}`);
  });
}


// node runConsumers.js



// ✅ Kafka Partition Assignment Behavior
// If your topic has 3 partitions and you run:

// 1 consumer instance → gets all 3 partitions

// 2 consumer instances → gets 2 + 1 partitions

// 3 consumer instances → each gets 1

// 4+ consumers → extra ones will be idle (no partition assigned)

// Kafka does not split a single partition across multiple consumers in the same group.
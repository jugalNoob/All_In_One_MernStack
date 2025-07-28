✅ Simple Notification System in Redis Pub/Sub
📁 Structure:
Publisher: Sends notifications

Subscriber: Listens and reacts to notifications

🔔 Publisher (send notifications):



🔔 Publisher (send notifications):

// publisher.js
const { createClient } = require("redis");
const publisher = createClient();

(async () => {
  await publisher.connect();

  const channel = "notifications";
  const message = JSON.stringify({
    user: "jugal",
    text: "📩 You received a new message!",
    time: new Date().toISOString()
  });

  await publisher.publish(channel, message);
  console.log("✅ Notification sent");
  process.exit(0); // Exit after publishing
})();



📢 Subscriber (receive notifications):


// subscriber.js
const { createClient } = require("redis");
const subscriber = createClient();

(async () => {
  await subscriber.connect();

  const channel = "notifications";

  await subscriber.subscribe(channel, (message) => {
    const data = JSON.parse(message);
    console.log(`🔔 Notification for ${data.user}: ${data.text} at ${data.time}`);
  });
})();


🔗 11. Pub/Sub Messaging
Goal: Decouple systems using publisher/subscriber pattern.

🔹 Use case:
Chat applications

Notification systems

Event broadcasting

Redis Pub/Sub is ephemeral (messages not persisted).
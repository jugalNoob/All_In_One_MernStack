

const { initProducer, sendMessage } = require("../producer/producer_sig");
// REST API to create a user and send data to Kafka
exports.signUP = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  try {
    // Ensure producer is ready
    if (!producer) {
      return res.status(500).json({ error: "Kafka Producer is not initialized yet" });
    }

    // Create user object
    const user = { name, email, password };

    // Send user data to Kafka topic
     await sendMessage("signUp_user", user);;

       // Send message to Kafka
    // await sendMessage("signUp_user", user);

    console.log("Message sent successfully:", user);
    res.status(201).json({
      message: "User created and sent to Kafka successfully",
      user,
    });
  } catch (error) {
    console.error("Error sending user data to Kafka:", error);
    res.status(500).json({ error: "Failed to send user data to Kafka" });
  }
};


// 🔁 Only call initProducer once (preferably during app startup)
initProducer();
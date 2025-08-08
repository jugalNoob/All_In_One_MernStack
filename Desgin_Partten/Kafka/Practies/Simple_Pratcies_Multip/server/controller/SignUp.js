const { initProducer, sendMessage } = require("../producer/producer_sig");

exports.signUP = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  try {
    const user = { name, email, password };

    // ✅ Only this line needed
    await sendMessage("signUp_user", user);

    console.log("Message sent successfully:", user);
    res.status(201).json({
      message: "User created and sent to Kafka successfully",
      user,
    });
  } catch (error) {
    console.error("Error sending user data to Kafka:", error.message || error);
    res.status(500).json({ error: "Failed to send user data to Kafka" });
  }
};

// ✅ Ensure this is only called once, in main app.js/server.js
initProducer(); // DON'T call here

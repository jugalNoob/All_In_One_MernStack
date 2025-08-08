const { initProducer, sendMessage } = require("../producer/producer_login"); 
const Register = require("../module/student");

exports.usersGet = async (req, res) => {
  try {
   
const users = await Register.find().lean();


    // 🔁 Kafka message
    await sendMessage("get_user",  users );

    console.log("✅ Users sent to Kafka");
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error in usersGet:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};


initProducer()
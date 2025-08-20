// // controllers/usersGet.js
// const producerInstance = require("../producer/getproducer");
// const Register = require("../module/student");

// exports.usersGet = async (req, res) => {
//   try {
//     // Ensure Kafka is connected before sending
//     await producerInstance.connect();

//     const users = await Register.find().lean();

//     await producerInstance.send("get_user", users);
//     console.log("✅ Users sent to Kafka");

//     res.status(200).json(users);
//   } catch (error) {
//     console.error("❌ Error in usersGet:", error);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// };


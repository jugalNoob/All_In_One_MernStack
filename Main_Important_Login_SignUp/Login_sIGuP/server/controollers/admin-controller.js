const Register = require("../model/student");

const getAllUsers = async (req, res) => {
  try {
    const userData = await Register.find({ role: 'user' }).select('-password'); // hide password
    res.status(200).json({ users: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllUsers;
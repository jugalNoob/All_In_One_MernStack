
const { initProducer, sendMessage } = require("../producer/producer_login");
exports.signUP = async (req, res) => {
  try {
    console.log("Fetching data from API...");
    const response = await fetch("https://jsonplaceholder.typicode.com/comments");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const apishow = await response.json();


        await sendMessage("login_user", {  apishow });

    res.status(200).json({
      message: "Data fetched successfully",
      data: apishow,
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Initialize Kafka producer when the server starts
initProducer();


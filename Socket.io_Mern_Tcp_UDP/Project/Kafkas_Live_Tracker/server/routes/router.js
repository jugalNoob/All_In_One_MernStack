const express = require("express");
const router = express.Router();
const Register = require('../model/student');
const  redisClient  = require('./Redis/redisClient'); // ✅ fix
const  { GetinitProducer,  GetsendMessage }  = require('../Producer/getproducer'); ///get  Producer 


// ✅ Your GET route to fetch data from MongoDB
router.get('/home', async (req, res) => {
  try {
    const data = await Register.find(); // assuming you have a Register model

    // ✅ Send user data to Kafka
    await  GetsendMessage("get_user",  data);

    await  GetsendMessage("get_user", {
      event: "FETCH_ALL_USERS",
      timestamp: new Date().toISOString(),
      payload: data
    });

    console.log("Users sent to Kafka successfully");

    res.status(200).json(data); // only one response
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Server Error');
  }
});

GetinitProducer()


module.exports = router;
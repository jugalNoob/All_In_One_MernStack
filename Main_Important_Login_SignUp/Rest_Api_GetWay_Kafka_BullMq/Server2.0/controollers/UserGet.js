

// Single Redis Caches ------------->>>


const Register=require("../model/student")

exports.Apiget = async (req, res) => {
  try {

 

    // 2. If not cached, fetch from MongoDB
    const data = await Register.find();




    console.log('⛏️ Data from MongoDB');
    res.status(200).json(data);

  } catch (error) {
    console.error('❌ Error in Apiget:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};
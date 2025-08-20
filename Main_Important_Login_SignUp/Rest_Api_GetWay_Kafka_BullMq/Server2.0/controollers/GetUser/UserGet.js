

// Single Redis Caches ------------->>>


const Register=require("../../model/student")
const { performance } = require("perf_hooks");


exports.Apiget = async (req, res) => {
  const start = performance.now();

  try {
    const data = await Register.find();

    const end = performance.now();
    const responseTime = (end - start).toFixed(2); // in ms

    console.log(`⏱️ Response Time: ${responseTime} ms`);
    res.status(200).json({
      data,
      responseTime: `${responseTime} ms`
    });

  } catch (error) {
    const end = performance.now();
    console.error(`❌ Error in Apiget (after ${(end - start).toFixed(2)} ms):`, error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

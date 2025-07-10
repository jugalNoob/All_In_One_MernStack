// exports.Apiget = async (req, res) => {

//     try {
//           res.json({ data: [{ id: 1, name: 'karan sharma pop start' }] });

//     } catch (error) {
        
//     }

// }



const axios = require('axios');

exports.Apiget = async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    res.json({ data: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

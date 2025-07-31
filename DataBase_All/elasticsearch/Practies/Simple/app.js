const express = require('express');
const { Client } = require('@elastic/elasticsearch');

const app = express();
const port = 3000;

// Elasticsearch client setup
const esClient = new Client({ node: 'http://localhost:9200' });

console.log(esClient.connectionPool.WeightedConnectionPool)

app.use(express.json()); // to parse JSON requests

// POST /users - Add a user
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
    const response = await esClient.index({
      index: 'users',
      document: {
        name,
        email,
        password, // NOTE: In real apps, always hash passwords!
        createdAt: new Date(),
      },
    });

    return res.status(201).json({
      message: 'User indexed successfully',
      id: response._id,
    });
  } catch (err) {
    console.error('Elasticsearch indexing error:', err);
    return res.status(500).json({ message: 'Failed to index user', error: err.message });
  }
});

// GET /users/:id - Get user by ID
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await esClient.get({
      index: 'users',
      id: userId,
    });

    return res.json(response._source);
  } catch (err) {
    return res.status(404).json({ message: 'User not found', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

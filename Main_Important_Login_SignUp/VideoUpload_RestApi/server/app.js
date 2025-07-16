const express = require('express');
const cors = require('cors');
const connectDB = require('./db/conn');
const videoRoutes = require('./routes/router');

const app = express();
connectDB();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use('/api', videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ✅ Test with Postman or Frontend
// POST http://localhost:5000/api/upload (form-data with key file)

// GET http://localhost:5000/api/video/:filename


// db.getCollection('videos.files').deleteMany({});
// db.getCollection('videos.chunks').deleteMany({});

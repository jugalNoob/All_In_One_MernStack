const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');

const mongoURI = 'mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority';

// Create a connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs, gridFSBucket;

conn.once('open', () => {
  console.log('✅ MongoDB GridFS connected');
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'videos',
  });
  gfs = gridFSBucket;
});

const storage = new GridFsStorage({
  db: conn, // Use the existing connection
  file: (req, file) => {
    return {
      filename: `video_${Date.now()}_${file.originalname}`,
      bucketName: 'videos',
    };
  },
});

module.exports = { gfs, storage };
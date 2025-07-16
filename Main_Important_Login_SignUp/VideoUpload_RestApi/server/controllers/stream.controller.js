// server/controllers/stream.controller.js
const { MongoClient, GridFSBucket } = require('mongodb');
const uri = 'mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority';

const streamVideo = async (req, res) => {
  try {
    const decodedFilename = decodeURIComponent(req.params.filename);
    console.log("\uD83D\uDC45 Requested filename:", decodedFilename);

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('ones');
    const bucket = new GridFSBucket(db, { bucketName: 'videos' });

    const file = await db.collection('videos.files').findOne({ filename: decodedFilename });

    if (!file) {
      console.error("\u274C File not found:", decodedFilename);
      return res.status(404).json({ error: 'Video not found' });
    }

    res.set('Content-Type', file.contentType || 'video/mp4');
    bucket.openDownloadStreamByName(decodedFilename).pipe(res);
  } catch (err) {
    console.error('\u26A0\uFE0F Streaming error:', err);
    res.status(500).json({ error: 'Streaming error' });
  }
};

const listVideos = async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('ones');
    const videos = await db.collection('videos.files').find({}).toArray();
    res.json(videos);
  } catch (err) {
    console.error('\u26A0\uFE0F Error fetching videos:', err);
    res.status(500).json({ error: 'Error fetching videos' });
  }
};

module.exports = { streamVideo, listVideos };

// const { MongoClient, GridFSBucket } = require('mongodb');

// const uri = "mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority";
// let client;

// async function initMongo() {
//   if (!client) {
//     client = new MongoClient(uri);
//     await client.connect();
//     console.log('✅ MongoDB GridFS initialized');
//   }
//   const db = client.db('ones');
//   const bucket = new GridFSBucket(db, { bucketName: 'videos' });
//   return { db, bucket };
// }

// const streamVideo = async (req, res) => {
//   try {
//     const { db, bucket } = await initMongo();
//     const filename = req.params.filename;

//     console.log("📥 Requested filename:", filename);

//     const file = await db.collection('videos.files').findOne({ filename });
//     if (!file) {
//       console.log("❌ File not found:", filename);
//       return res.status(404).json({ error: 'Video not found' });
//     }

//     res.set('Content-Type', file.contentType);
//     bucket.openDownloadStreamByName(filename).pipe(res);

//   } catch (err) {
//     console.error("🔥 Streaming error:", err);
//     res.status(500).json({ error: 'Streaming error' });
//   }
// };

// const listVideos = async (req, res) => {
//   try {
//     const { db } = await initMongo();
//     const videos = await db.collection('videos.files').find({}).toArray();

//     console.log("📃 Total videos found:", videos.length);
//     res.json(videos);
//   } catch (err) {
//     console.error("🔥 Error fetching videos:", err);
//     res.status(500).json({ error: 'Error fetching videos' });
//   }
// };

// module.exports = { streamVideo, listVideos };

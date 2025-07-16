const { MongoClient, GridFSBucket } = require('mongodb');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uri = "mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority";
const upload = multer({ dest: 'uploads/' }); // temporary local upload

const uploadVideo = [
  upload.single('file'),
  async (req, res) => {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db('ones');
      const bucket = new GridFSBucket(db, { bucketName: 'videos' });

      const filePath = path.join(__dirname, '../uploads', req.file.filename);
      const uploadStream = bucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype
      });

      fs.createReadStream(filePath)
        .pipe(uploadStream)
        .on('error', (err) => {
          console.error('Upload error:', err);
          res.status(500).json({ error: 'Upload failed' });
        })
        .on('finish', () => {
          fs.unlinkSync(filePath); // delete temp file
          res.status(200).json({ message: 'Video uploaded successfully', fileId: uploadStream.id });
        });
    } catch (err) {
      console.error('MongoDB error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
];

module.exports = { uploadVideo };

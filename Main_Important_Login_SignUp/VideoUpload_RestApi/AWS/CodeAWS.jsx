✅ 3. Express Backend (Upload & Serve Metadata)
🔸 Install required packages
bash
Copy
Edit
npm install express multer aws-sdk multer-s3 mongoose cors
🔸 upload.controller.js
js
Copy
Edit
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Video = require('../models/Video.model');

AWS.config.update({ region: 'ap-south-1' });

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'your-video-bucket',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const filename = `videos/${Date.now()}_${file.originalname}`;
      cb(null, filename);
    },
  }),
});

const uploadVideo = upload.single('video');

const saveVideoMetadata = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No video uploaded' });

  const { key, location } = req.file;
  await Video.create({ filename: key, url: location });

  res.json({ message: '✅ Uploaded to S3', url: location });
};

module.exports = { uploadVideo, saveVideoMetadata };
✅ 4. Define Routes
🔸 router.js
js
Copy
Edit
const express = require('express');
const router = express.Router();
const { uploadVideo, saveVideoMetadata } = require('../controllers/upload.controller');
const Video = require('../models/Video.model');

router.post('/upload', uploadVideo, saveVideoMetadata);

router.get('/videos', async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

module.exports = router;
✅ 5. Mongoose Model (Video.model.js)
js
Copy
Edit
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  filename: String,
  url: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);
✅ 6. React Frontend (Video Upload & Play)
🔸 Upload Component
jsx
Copy
Edit
// UploadForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', file);
    const res = await axios.post('http://localhost:5000/api/upload', formData);
    alert('Uploaded: ' + res.data.url);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadForm;
🔸 List and Stream Videos
jsx
Copy
Edit
// VideoList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/videos').then((res) => setVideos(res.data));
  }, []);

  return (
    <div>
      <h2>📽️ Video List</h2>
      {videos.map((video) => (
        <div key={video._id}>
          <p>{video.filename}</p>
          <video controls width="500" src={video.url} />
        </div>
      ))}
    </div>
  );
}

export default VideoList;
✅ Example CloudFront URL (Public)
bash
Copy
Edit
https://d123abcd.cloudfront.net/videos/1723458972_video1.mp4
You can directly use this in:

html
Copy
Edit
<video controls src="https://d123abcd.cloudfront.net/videos/1723458972_video1.mp4"></video>
✅ Security (Optional)
Use Signed URLs with CloudFront for private access

Use Content-Disposition headers for download protection

Use HLS or DASH for adaptive bitrate streaming

✅ Summary
Step	Tool / Technology
Upload	React → Express → S3
Store metadata	MongoDB / PostgreSQL
Serve video	CloudFront CDN
Secure access	CloudFront Signed URLs
Stream frontend	HTML5 <video>, hls.js

Would you like me to generate a full working GitHub project with this setup (backend + frontend + deploy instructions)?







Voice chat ended




Ask ChatGPT



Tools




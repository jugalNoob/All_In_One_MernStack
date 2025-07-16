const express = require('express');
const router = express.Router();
const { uploadVideo } = require('../controllers/upload.controller');
const { streamVideo, listVideos } = require('../controllers/stream.controller');

router.post('/upload', uploadVideo, (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  res.status(200).json({
    message: 'Video uploaded successfully',
    file: req.file,
  });
});

router.get('/video/:filename', streamVideo);
router.get('/videos', listVideos);

module.exports = router;

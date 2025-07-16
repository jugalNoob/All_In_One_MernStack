const multer = require('multer');
const { gfs, storage } = require('../services/gridfs');

const upload = multer({ storage });

const uploadVideo = upload.single('file');

const streamVideo = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file || !file.contentType.startsWith('video')) {
      return res.status(404).json({ error: 'Video not found' });
    }
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving video' });
  }
};

module.exports = { uploadVideo, streamVideo };

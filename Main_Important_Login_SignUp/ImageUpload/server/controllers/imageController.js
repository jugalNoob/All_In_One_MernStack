const { gfs } = require("../db");

// ✅ GET: Stream image by filename
exports.getImage = async (req, res) => {
  try {
    const file = await gfs.find({ filename: req.params.filename }).toArray();

    if (!file || file.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

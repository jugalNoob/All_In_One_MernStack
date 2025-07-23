const express = require("express");
const multer = require("multer");
const { storage } = require("../db");
const imageController = require("../controllers/imageController");

const router = express.Router();
const upload = multer({ storage });

// ✅ POST: Upload an image
router.post("/upload", upload.single("image"), (req, res) => {
  res.status(201).json({ file: req.file });
});

// ✅ GET: Retrieve image by filename
router.get("/image/:filename", imageController.getImage);

module.exports = router;

const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");

const mongoURI = "mongodb://localhost:27017/myImageDB";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

let gfs;
conn.once("open", () => {
  const { GridFSBucket } = require("mongodb");
  gfs = new GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  console.log("✅ MongoDB connected with GridFS");
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => ({
    bucketName: "uploads",
    filename: `${Date.now()}-${file.originalname}`,
  }),
});

module.exports = { conn, gfs, storage };

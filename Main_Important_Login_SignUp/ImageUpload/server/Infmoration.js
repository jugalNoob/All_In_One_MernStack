| Feature                    | Description                              |
| -------------------------- | ---------------------------------------- |
| `multer-gridfs-storage`    | Automatically saves to GridFS            |
| GridFS                     | Handles large files in MongoDB over 16MB |
| Modular routes/controllers | Scalable structure                       |
| Streaming response         | Fast image serving                       |



| Package           | Purpose                                                            |
| ----------------- | ------------------------------------------------------------------ |
| `multer`          | Middleware for handling `multipart/form-data` (image/file uploads) |
| `gridfs-stream`   | Upload large files to MongoDB                                      |
| `mongoose-gridfs` | Store files in MongoDB GridFS                                      |



🧩 Example Usage Flow
Client uploads image using POST form.

multer receives it.

multer-gridfs-storage stores it in MongoDB via GridFS.

gridfs-stream helps you retrieve/download it later.
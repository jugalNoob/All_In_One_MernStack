const express = require("express");
const imageRoutes = require("./routes/imageRoutes");

const app = express();
const PORT = 9000;

app.use(express.json());
app.use("/api/v1", imageRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

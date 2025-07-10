const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const { startMonitoring } = require("./controller/CPU/cpu");
// const networkRouter = require("./routes/networkRouter"); // Import the network route

const app = express();
const port = 9000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
}));

// Latency middleware

// // Register the network route
// app.use(networkRouter);

// const homeMiddleware = (req, res, next) => {
app.use((req, res, next) => {
  const start = Date.now();
  
  // Log request method and URL to confirm that the middleware is working
  console.log(`[INFO] Incoming Request: ${req.method} ${req.originalUrl} lantcydata`);
  
  
  // Attach the finish event listener to log latency
  res.on("finish", () => {
    const latency = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${latency}ms lantcy`);
  });

  // Call next middleware or route handler
  next();
});


// Register router
app.use(router);



// // Start CPU monitoring once on server boot
// startMonitoring();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

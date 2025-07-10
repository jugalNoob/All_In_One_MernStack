
const express = require('express');
const router=require('./routes/router')
const cors=require('cors')
const path = require('path');
const si = require('systeminformation');
const app = express();
const { Queue } = require('bullmq');
const IORedis = require('ioredis');
const port = 9000;
const fs = require('fs')


const connection = new IORedis();

const myQueue = new Queue('myQueueName', { connection });


// Middleware for parsing JSON (optional)
app.use(express.json());

// Check storage of the root directory
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));


app.use(router)






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

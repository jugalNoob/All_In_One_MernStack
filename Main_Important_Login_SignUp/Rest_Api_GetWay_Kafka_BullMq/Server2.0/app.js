const express = require('express');

const connectMongo=require("./db/conn")
// 👈 must be called before handling any routes
//------------------------------------------
const router = require('./routes/router');  // Assuming router handles your /form route
const app = express();
const cors = require('cors');
const Register = require("./model/student");

connectMongo(); 

app.use(express.json()) // ✅ correct for JSON body parsing
app.use(express.urlencoded({ extended: true }));
// Custom error handling for bad JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {

    console.log(err)
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next();
});



const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(router)

app.get('/', (req, res) => {
  res.json({ message: 'Kong Gateway is forwarding properly!' });
});





app.listen(9000, () => {
  console.log('Backend API running at http://localhost:9000');
});



//cloudflared tunnel --url http://localhost:9000  -->> clouddepoly
const express = require('express');
require("./SubBloack/RedisSub"); // Listen for block alerts //sub alert 

// ------->>Mongodb aLL Infomration """"
// require("./db/conn") //simple db
const connectMongo = require("./db/pool")//pool DB 
require("./db/Mon")
//------------------------------------------
const router = require('./routes/router');  // Assuming router handles your /form route
const app = express();
const cors = require('cors');
const RegisterGet = require("./model/Apistudent");


connectMongo(); // Establish pooled connection
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
  res.json({ message: 'Kong Gateway is forwarding properly! jugal sharma' });
});



app.get('/jugal', (req, res) => {
  res.json({ 
    name:'jugal sharma',
    rollno:45,
    class:'10th',
    io:'AI'
   });
});




app.listen(9000, () => {
  console.log('Backend API running at http://localhost:9000');
});



//cloudflared tunnel --url http://localhost:9000  -->> clouddepoly
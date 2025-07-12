const express = require('express');


const router = require('./routes/router');  // Assuming router handles your /form route
const app = express();


app.use(express.json()) // ✅ correct for JSON body parsing

app.use(router)

app.get('/', (req, res) => {
  res.json({ message: 'Kong Gateway is forwarding properly!' });
});

app.get('/users', (req, res) => {
  res.json({ data: [{ id: 1, name: 'Jugal Sharma' }, { id: 2, name: 'Karan Sharma' }] });
});





app.get("/usersi", (req, res) => {
  res.json({ data: [{ id: 1, name: "Jugal Sharma" }] });
});

app.get("/getuseri", (req, res) => {
  res.json({ data: [{ id: 2, name: "Karan Sharma" }] });
});


app.listen(9000, () => {
  console.log('Backend API running at http://localhost:9000');
});



//cloudflared tunnel --url http://localhost:9000  -->> clouddepoly
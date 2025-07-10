const express = require("express");

const app = express();

const port = 5000;

app.get("/", (req, res) => {
  res.send("Welcome to my API! jugal sharma");
  // https://das-input-migration-loving.trycloudflare.com/
});


app.get("/api/", (req, res) => {
  res.send("Welcome to my API! jugal sharma /mew api karan sharma");
  // https://das-input-migration-loving.trycloudflare.com/api/

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// cloudflared  tunnel --url http://localhost:5000/
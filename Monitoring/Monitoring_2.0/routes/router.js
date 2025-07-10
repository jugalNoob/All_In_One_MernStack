const express = require("express");
const router = new express.Router();


// Montoring function start row class 
const { monitorMiddleware, metricsRoute } = require("../Monitoring/monit.js");
router.use(monitorMiddleware);





router.get("/", (req, res) => {
    res.send("Jugal Sharma");
});

router.get("/home", (req, res) => {
    res.send("home");
});



router.get("/metrics", metricsRoute);



module.exports = router;

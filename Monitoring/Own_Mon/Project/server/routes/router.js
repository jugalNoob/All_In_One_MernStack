const express = require("express");
const { homeMiddleware } = require("../controller/reqCount/req");
const si = require('systeminformation');

const { formMiddleware }=require("../controller/reqCount/req_form")
const { infoMiddleware}=require("../controller/reqCount/req_info")
const {loginMiddleware}=require("../controller/reqCount/req_login")
const {  getCPUUsage } = require("../controller/CPU/cpu");
const { getDirectoriesInHome } = require('../controller/check_folder/folder');
const { getNetworkBytes } = require("../controller/network_data/network") // Import the function
const { getUptimeData } = require("../controller/uptimer/uptime")
const router = express.Router();


// moniter UpTime

router.get('/uptime', (req, res) => {
  try {
      const data = getUptimeData();
      res.json({
          message: 'System uptime fetched successfully',
          data
      });
  } catch (err) {
      console.error("Error fetching uptime:", err);
      res.status(500).json({ error: 'Failed to fetch uptime', details: err.message });
  }
});


// network Data Check

router.get('/network', (req, res) => {
  try {
      const networkData = getNetworkBytes();
      res.json({
          message: 'Network data fetched successfully',
          network: networkData,
      });
  } catch (error) {
      console.error('Error fetching network data:', error);
      res.status(500).json({
          error: 'Failed to fetch network data',
          details: error.message,
      });
  }
});


// ---<>>>> Check folders 

router.get('/folder', async (req, res) => {
  try {
    const directories = await getDirectoriesInHome();
    res.json({ directories });
    console.log("ju folder")
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch directories' });
  }
});



// --- >>> check ram  memory in node.js 

router.get('/storage', async (req, res) => {
  try {
      const diskData = await si.fsSize();
      console.log(diskData)
      const storage = diskData.map(disk => ({
          mount: disk.mount,
          total: (disk.size / (1024 ** 3)).toFixed(2) + ' GB',
          used: (disk.used / (1024 ** 3)).toFixed(2) + ' GB',
          free: (disk.size - disk.used) / (1024 ** 3).toFixed(2) + ' GB',
          type: disk.type
      }));

      res.json(storage);
  } catch (err) {
      res.status(500).json({ error: 'Failed to fetch storage information', details: err.message });
  }
});



// ---> check Cpu proformance

router.get("/cpu", async (req, res) => {
  try {
    const data = await  getCPUUsage ();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to get CPU usage" });
  }
});



// Home route with homeMiddleware

router.get("/home", homeMiddleware, (req, res) => {
  // Ensure that duration is attached before sending the response
  res.json({
      visitCount: req.count,
      log: req.log,
      duration: req.duration,  // Ensure duration is available
  });
});



router.get("/form", formMiddleware , (req, res) => {
  // Ensure that duration is attached before sending the response
  res.json({
      visitCount: req.count,
      log: req.log,
      duration: req.duration,  // Ensure duration is available
  });
});


router.get("/login", loginMiddleware, (req, res) => {
  // Ensure that duration is attached before sending the response
  res.json({
      visitCount: req.count,
      log: req.log,
      duration: req.duration,  // Ensure duration is available
  });
});



router.get("/info", infoMiddleware, (req, res) => {
  // Ensure that duration is attached before sending the response
  res.json({
      visitCount: req.count,
      log: req.log,
      duration: req.duration,  // Ensure duration is available
  });
});




module.exports = router;

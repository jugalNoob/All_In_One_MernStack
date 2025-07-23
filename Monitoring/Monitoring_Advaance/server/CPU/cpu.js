const os = require('os');

const cpuMonitor = (req, res, next) => {
  const cpuUsage = process.cpuUsage();
  const cpuPercent = (cpuUsage.user + cpuUsage.system) / 1000;
  console.log(`CPU Time: ${cpuPercent.toFixed(2)} ms`);
  next();
};
module.exports = cpuMonitor;
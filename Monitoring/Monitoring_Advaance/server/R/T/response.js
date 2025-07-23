const responseTime = require('response-time');

// Export as a middleware function
const responseTimer = responseTime((req, res, time) => {
  console.log(`${req.method} ${req.url} - ${time.toFixed(3)} ms`);
});

module.exports = responseTimer;

const express = require('express');
const { monitorMiddleware, metricsRoute } = require('./promethus/prom');

const app = express();
const port = 9000;

// Use Prometheus monitoring middleware
app.use(monitorMiddleware);

// Prometheus endpoint
app.get('/metrics', metricsRoute);

// Slow response endpoint for testing
app.get('/slow', (req, res) => {
  setTimeout(() => res.send('Slow response done!'), 500);
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

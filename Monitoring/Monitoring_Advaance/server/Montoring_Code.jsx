






1---->>>>var responseTime = require('response-time'); // ⏱ Middleware to record response time

app.use(responseTime(function (req, res, time) {
  console.log(`${req.method} ${req.url} - ${time.toFixed(3)} ms`);
}));


app.get('/', function (req, res) {
  res.send('hello, world!'); // 🟢 Simple GET endpoint
});



2 ::: --->>>const morgan = require('morgan');  


// Log HTTP details
const customFormat = ':remote-addr :remote-user :method :url HTTP/:http-version :status - Size of response: :res[content-length] bytes - :response-time ms';


app.get('/slow', (req, res) => {
  setTimeout(() => res.send('slow response'), 500);
});
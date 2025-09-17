🧱 1. Application-Level Middleware
Middleware bound to an instance of express().

js
Copy
Edit
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('App-level middleware');
  next();
});
Can be specific to routes:
app.use('/api', middlewareFn);

🔁 2. Router-Level Middleware
Same as app-level, but applied to express.Router() instance.

js
Copy
Edit
const router = express.Router();

router.use((req, res, next) => {
  console.log('Router-level middleware');
  next();
});

app.use('/users', router);
🧪 3. Built-in Middleware
Express comes with these built-in middlewares:

Middleware	Purpose
express.json()	Parses JSON bodies
express.urlencoded()	Parses URL-encoded data (form data)
express.static()	Serves static files
js
Copy
Edit
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
🛠 4. Third-Party Middleware
Installed via npm.

Examples:

bash
Copy
Edit
npm i morgan cors helmet cookie-parser
js
Copy
Edit
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
🔐 5. Error-Handling Middleware
Must have 4 parameters: (err, req, res, next)

js
Copy
Edit
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
Put this after all routes.

🔂 6. Request-Specific Middleware
Applies to specific routes only.

js
Copy
Edit
const authMiddleware = (req, res, next) => {
  if (req.headers.token === '123') next();
  else res.status(401).send('Unauthorized');
};

app.get('/secure', authMiddleware, (req, res) => {
  res.send('Secure data');
});
🧬 7. Chained Middleware
Multiple middleware functions in a single route.

js
Copy
Edit
app.get('/profile', authMiddleware, logMiddleware, (req, res) => {
  res.send('User Profile');
});
🪄 8. Custom Middleware
Any reusable function for validation, logging, headers, etc.

js
Copy
Edit
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
⚙️ 9. Conditional Middleware
Apply based on conditions (headers, path, query, etc.)

js
Copy
Edit
app.use((req, res, next) => {
  if (req.query.debug === 'true') console.log('Debugging...');
  next();
});


Summary Table:
Type	Scope	Example Use
Application-level	Global	Logging, headers
Router-level	Route group	/users, /products
Built-in	Core tasks	Parsing, static files
Third-party	External libraries	Logging, security, CORS
Error-handling	Error management	Custom error formatting
Request-specific	Single route	Auth, validation
Chained middleware	Route chain	Multi-step processing
Custom	Reusable logic	Throttling, roles
Conditional	Dynamic conditions	Dev/debug checks
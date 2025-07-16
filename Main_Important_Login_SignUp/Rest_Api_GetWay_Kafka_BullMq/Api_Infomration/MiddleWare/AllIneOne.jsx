
🧩 What is Middleware?
In Express (or any backend framework), middleware is a function that has access to:


(req, res, next)
It can:

Modify req or res

End the request-response cycle

Call next() to move to the next middleware

📚 All Types of Middleware (with Examples)




1. 🔌 Application-Level Middleware
Applies globally to all or specific routes in your Express app


app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});


✅ Use Cases: Logging, parsing, setting headers 


2. 📍 Router-Level Middleware
Applies to specific routers

const router = express.Router();

router.use((req, res, next) => {
  console.log('Router-specific middleware');
  next();
});



3. ⚙️ Built-in Middleware (Express.js) 


| Middleware             | Purpose                             |
| ---------------------- | ----------------------------------- |
| `express.json()`       | Parse incoming JSON                 |
| `express.urlencoded()` | Parse URL-encoded form data         |
| `express.static()`     | Serve static files from a directory |



app.use(express.json());
app.use(express.static('public'));



4. 🧩 Third-Party Middleware  


| Package           | Use Case                       |
| ----------------- | ------------------------------ |
| `cors`            | Handle CORS headers            |
| `helmet`          | Add security headers           |
| `morgan`          | HTTP request logging           |
| `body-parser`     | (Old) JSON and URL parsing     |
| `express-session` | Session support                |
| `passport`        | Authentication strategies      |
| `rate-limit`      | Throttle excessive API usage   |
| `compression`     | GZIP compression for responses |


5. 🔐 Authentication Middleware  


function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}


6. 📦 Error-Handling Middleware
Special form with 4 arguments: 


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});



7. 🛡️ Validation Middleware
Used with libraries like zod, joi, or express-validator:


app.post('/user', validateUser, (req, res) => { ... });



8. 🧾 Request/Response Modification Middleware

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});


9. 📊 Logging & Monitoring Middleware
Use cases:

Log all requests (morgan)

Monitor latency, memory, response times

Custom dashboards (e.g., express-status-monitor)

10. 🧪 Custom Business Logic Middleware

E.g., check user role, subscription plan, access tier:



| Middleware Type      | Purpose                             |
| -------------------- | ----------------------------------- |
| Application-Level    | General tasks like logging, parsing |
| Router-Level         | Scoped logic per router             |
| Built-in             | JSON parsing, static files          |
| Third-Party          | CORS, sessions, logging, auth       |
| Auth                 | Token/session validation            |
| Error-Handling       | Catch and format errors             |
| Validation           | Ensure valid input                  |
| Request Modification | Add custom fields to `req` or `res` |
| Logging/Monitoring   | Record performance, health          |
| Business Logic       | Role checks, feature flags          |



💎 Bonus Advanced Middleware Ideas  


| Use Case                | Middleware Description                                    |
| ----------------------- | --------------------------------------------------------- |
| 🔐 CSRF Protection      | Validate tokens for web forms or state-changing APIs      |
| 📊 Real-Time Metrics    | Expose `/metrics` using Prometheus-style output           |
| 🧪 Canary Deployments   | Route % of traffic based on cookie/header/match           |
| ⚠️ API Deprecation      | Warn or block deprecated versions in middleware           |
| 🧰 Dependency Injection | Attach service layer methods to `req` (`req.services.db`) |
| 📎 Multi-tenancy        | Resolve tenant context from subdomain or token            |



✅ Summary: Advanced Middleware Use Cases 


| Feature                     | Why it’s Useful                       |
| --------------------------- | ------------------------------------- |
| Async wrapper               | Clean async error handling            |
| Role-based middleware       | Granular authorization                |
| Rate limiting               | API abuse protection                  |
| Contextual logging          | Track request lifecycle & performance |
| Audit logs                  | Trace sensitive operations            |
| IP filtering                | Lock down internal routes             |
| Factory pattern             | Reuse logic with config               |
| Internationalization (i18n) | Language-aware API responses          |




1. 🔁 Middleware Composition & Chaining
Break logic into small, reusable middlewares.

Chain them together in the route or router.


const authenticate = (req, res, next) => { ... };
const authorize = role => (req, res, next) => { ... };
const validateInput = (schema) => (req, res, next) => { ... };

app.post('/admin/data', authenticate, authorize('admin'), validateInput(schema), handler);



2. 🔄 Asynchronous Error-Handling Middleware
Catch errors in async routes without try/catch everywhere.


const asyncWrapper = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/data', asyncWrapper(async (req, res) => {
  const data = await getDataFromDB();
  res.json(data);
}));
✅ Why? DRY code and centralized error handling.


3. 🧠 Context Middleware (Request Context)
Attach contextual data to req, like user, permissions, session, or requestId.


app.use((req, res, next) => {
  req.context = {
    requestId: crypto.randomUUID(),
    startTime: Date.now()
  };
  next();
});

✅ Why? Useful for tracing, logging, debugging, correlation ID. 


4. 🔐 JWT + Permissions Middleware
js
Copy
Edit
const authorizePermission = (requiredPerms = []) => {
  return (req, res, next) => {
    const userPerms = req.user?.permissions || [];
    const hasAccess = requiredPerms.every(p => userPerms.includes(p));
    if (!hasAccess) return res.status(403).json({ error: 'Access denied' });
    next();
  };
};
✅ Why? Granular, dynamic access control.


5. 📡 Rate Limiting Middleware (Per IP / Per Route / Per Token)
Using express-rate-limit or a custom Redis-based limiter:

js
Copy
Edit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit per IP
  message: 'Too many requests from this IP, try again later.'
});

app.use('/api/', limiter);
✅ Why? Protect against abuse or DDoS.



6. 🔒 IP Whitelisting / Internal Access Only

const allowIPs = ['127.0.0.1'];

const ipWhitelist = (req, res, next) => {
  if (!allowIPs.includes(req.ip)) {
    return res.status(403).send('Access denied');
  }
  next();
};

app.use('/internal', ipWhitelist);


✅ Why? Protect internal dashboards or health endpoints.\



7. 🧾 Audit Logging Middleware
Capture important API actions for security auditing.

js
Copy
Edit
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    console.log(`[AUDIT] ${req.method} ${req.url} - ${res.statusCode} - ${elapsed}ms`);
  });
  next();
});



8. 🧬 Request Mutation Detection
Ensure request isn’t tampered mid-chain by malicious middlewares.

js
Copy
Edit
const freezeRequest = (req, res, next) => {
  Object.freeze(req.body);
  Object.freeze(req.query);
  next();
};
✅ Why? Enforce immutability for security/sanity


9. 📦 Middleware Factory Functions
Create configurable middlewares.

js
Copy
Edit
function cacheControl(seconds) {
  return (req, res, next) => {
    res.set('Cache-Control', `public, max-age=${seconds}`);
    next();
  };
}

app.get('/images', cacheControl(3600), handler);




10. 🌐 Localization / i18n Middleware

app.use((req, res, next) => {
  const lang = req.headers['accept-language'] || 'en';
  req.lang = lang.split(',')[0];
  next();
});
const morgan = require('morgan');

// Add custom tokens
morgan.token('host', (req) => req.hostname);
morgan.token('user-agent', (req) => req.headers['user-agent']);
morgan.token('query', (req) => JSON.stringify(req.query));
morgan.token('body', (req) => JSON.stringify(req.body));

// Define a custom log format including custom tokens
const customFormat = `:remote-addr :method :url HTTP/:http-version :status :res[content-length] - :response-time ms - Host: :host - Agent: :user-agent - Query: :query`;

const logger = morgan(customFormat);

module.exports = customFormat ;

const server = require('restana')();
const path = require('path');
const files = require('serve-static');
const bodyParser = require('body-parser');

console.log('Lambda cold start - initializing server');

try {
  console.log('Loading Next.js standalone server');
  const app = require('./build/_next/standalone/server');
  const nextRequestHandler = app.getRequestHandler();
  console.log('Next.js standalone server loaded successfully');

  server.use(files(path.join(__dirname, 'build/_next/static'), {
    index: false,
    maxAge: '30d',
    prefix: '/_next/static'
  }));
  server.use(files(path.join(__dirname, 'public')));

  server.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);

    const originalEnd = res.end;
    res.end = function () {
      console.log(`Response sent: ${req.method} ${req.url} - Status: ${res.statusCode}`);
      return originalEnd.apply(this, arguments);
    };

    next();
  });

  server.all('/api/*', bodyParser.json(), bodyParser.urlencoded({ extended: true }), (req, res) => {
    console.log('Handling API request');
    nextRequestHandler(req, res);
  });

  server.all('', (req, res) => {
    console.log('Handling root request');
    nextRequestHandler(req, res);
  });
  server.all('*', (req, res) => {
    console.log(`Handling wildcard request: ${req.url}`);
    nextRequestHandler(req, res);
  });

} catch (error) {
  console.error('Error during server initialization:', error);

  server.all('*', (req, res) => {
    console.error('Request received but server failed to initialize');
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Server initialization failed', details: error.message }));
  });
}

server.use((err, req, res, next) => {
  console.error(`Server error for ${req.method} ${req.url}:`, err);
  res.statusCode = 500;
  res.end(JSON.stringify({ error: 'Internal Server Error', details: err.message }));
});

module.exports.handler = require('serverless-http')(server);
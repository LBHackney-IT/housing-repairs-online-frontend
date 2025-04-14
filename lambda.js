const server = require('restana')();
const path = require('path');
const files = require('serve-static');
const bodyParser = require('body-parser');

process.env.NODE_ENV = 'production';

server.use('/_next/static', files(path.join(__dirname, 'build/_next/static')));
server.use(files(path.join(__dirname, 'public')));

const nextApp = require('./build/_next/standalone/server');
const nextRequestHandler = nextApp.getRequestHandler();

server.all('/api/*', bodyParser.json(), bodyParser.urlencoded({ extended: true}), (req, res) =>
  nextRequestHandler(req, res)
);

server.all('', (req, res) => nextRequestHandler(req, res));
server.all('*', (req, res) => nextRequestHandler(req, res));

module.exports.handler = require('serverless-http')(server);
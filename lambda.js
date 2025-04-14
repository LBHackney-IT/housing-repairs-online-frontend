const server = require('restana')();
const files = require('serve-static');
const path = require('path');
const bodyParser = require('body-parser');

process.env.NODE_ENV = 'production';

server.use(files(path.join(__dirname, '.next/static'), {
  index: false,
  maxAge: '30d',
  prefix: '/_next/static'
}));

server.use(files(path.join(__dirname, 'public')));

const nextRequestHandler = require('./.next/standalone/server').getRequestHandler();

server.all('/api/*', bodyParser.json(), bodyParser.urlencoded({ extended: true}), (req, res) =>
  nextRequestHandler(req, res)
);

server.all('', (req, res) => nextRequestHandler(req, res));
server.all('*', (req, res) => nextRequestHandler(req, res));

module.exports.handler = require('serverless-http')(server);
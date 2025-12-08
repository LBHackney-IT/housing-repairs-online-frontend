const server = require('restana')();
const files = require('serve-static');
const path = require('path');

const standaloneDir = path.join(__dirname, '../build/_next/standalone');
const Next = require(path.join(standaloneDir, 'node_modules/next'));

// https://github.com/vercel/next.js/issues/64031#issuecomment-2078708340
const { config } = require(path.join(
  standaloneDir,
  'build/_next/required-server-files.json'
));
process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(config);

const app = Next({
  dev: false,
  dir: standaloneDir,
  conf: config,
});

let isReady = false;
let nextRequestHandler;

async function init() {
  if (!isReady) {
    await app.prepare();
    nextRequestHandler = app.getRequestHandler();
    isReady = true;
  }
}

server.use(files(path.join(__dirname, '../build')));
server.use(files(path.join(__dirname, '../public')));

server.all('*', async (req, res) => {
  await init();
  return nextRequestHandler(req, res);
});

module.exports.handler = require('serverless-http')(server);

// const server = require('restana')()
// const app = require('next')({ dev: false })
// const files = require('serve-static')
// const path = require('path')

// const getHandler = async () => {
//   await app.prepare()
//   const nextRequestHandler = app.getRequestHandler()

//   server.use(files(path.join(__dirname, 'build')))
//   server.use(files(path.join(__dirname, 'public')))

//   server.all('*', (req, res) => nextRequestHandler(req, res))

//   return require('serverless-http')(server)
// }

// module.exports.handler = async (event, context) => {
//   const serverlessHandler = await getHandler()
//   return serverlessHandler(event, context)
// }

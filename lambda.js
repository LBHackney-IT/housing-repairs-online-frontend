const server = require('restana')()
const app = require('next')({ dev: false })
const files = require('serve-static')
const path = require('path')

const getHandler = async () => {
  await app.prepare()
  const nextRequestHandler = app.getRequestHandler()

  server.use(files(path.join(__dirname, 'build')))
  server.use(files(path.join(__dirname, 'public')))

  server.all('*', (req, res) => nextRequestHandler(req, res))

  return require('serverless-http')(server)
}

module.exports.handler = async (event, context) => {
  const serverlessHandler = await getHandler()
  return serverlessHandler(event, context)
}

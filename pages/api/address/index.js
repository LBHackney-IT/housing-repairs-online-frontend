const Sentry = require('@sentry/node')

const { searchPropertiesGateway, sentryParams } = require('../gateways')

export default async function handler(req, res) {
  Sentry.init(sentryParams)

  try {
    let results = await searchPropertiesGateway(req.query.postcode)
    res.status(200).json(results)
  } catch (e) {
    Sentry.captureException(e)
    await Sentry.flush(2000)
    let results = new Error('Error searching')
    res.status(500).json(results)
  }
}

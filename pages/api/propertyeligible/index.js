const Sentry = require('@sentry/node')

const { propertyEligibleGateway, sentryParams } = require('../gateways')

export default async function handler(req, res) {
  Sentry.init(sentryParams)

  try {
    let results = await propertyEligibleGateway(req.query.propertyId)
    res.status(200).json(results)
  } catch (e) {
    Sentry.captureException(e)
    await Sentry.flush(2000)
    let results = new Error(
      'An error occurred while attempting to validate the property'
    )
    res.status(500).json(results)
  }
}

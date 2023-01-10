const Sentry = require('@sentry/node')

const { checkMaintenanceModeGateway, sentryParams } = require('../gateways')

export default async function (req, res) {
  Sentry.init(sentryParams)

  try {
    const result = await checkMaintenanceModeGateway(req.body)
    res.status(200).json(result)
  } catch (e) {
    Sentry.captureException(e)
    await Sentry.flush(2000)

    new Error('Error checking')
    res.status(500).send()
  }
}

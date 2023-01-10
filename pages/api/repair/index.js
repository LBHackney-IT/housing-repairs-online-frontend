const Sentry = require('@sentry/node')

const { saveRepairGateway, sentryParams } = require('../gateways')

export default async function (req, res) {
  Sentry.init(sentryParams)

  try {
    let result = await saveRepairGateway(req.body)
    res.status(200).json(result)
  } catch (e) {
    Sentry.captureException(e)
    await Sentry.flush(2000)

    let result = new Error('Error saving')
    res.status(500).json(result)
  }
}

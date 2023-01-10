const Sentry = require('@sentry/node')

const { availableAppointmentsGateway, sentryParams } = require('../gateways')

export default async function (req, res) {
  Sentry.init(sentryParams)

  try {
    let results = await availableAppointmentsGateway({
      repairLocation: req.query.repairLocation,
      repairProblem: req.query.repairProblem,
      repairIssue: req.query.repairIssue,
      locationId: req.query.locationId,
      fromDate: req.query.fromDate,
    })
    res.status(200).json(results)
  } catch (e) {
    Sentry.captureException(e)
    await Sentry.flush(2000)

    let results = new Error('Error searching')
    res.status(500).json(results)
  }
}

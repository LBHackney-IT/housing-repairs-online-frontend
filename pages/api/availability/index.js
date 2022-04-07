const Sentry = require('@sentry/node');

const {availableAppointmentsGateway, sentryParams} = require('../gateways');

module.exports = async function handler (req, res) {
  Sentry.init(sentryParams);

  let status;
  let results;

  try {
    results = await availableAppointmentsGateway({
      repairLocation: req.query.repairLocation,
      repairProblem: req.query.repairProblem,
      repairIssue: req.query.repairIssue,
      locationId: req.query.locationId,
      fromDate: req.query.fromDate
    });
  } catch (e) {
    Sentry.captureException(e);
    await Sentry.flush(2000);

    status = 500;
    results = new Error('Error searching');
  }

  res = {
    status: status,
    body: results,
  };
};

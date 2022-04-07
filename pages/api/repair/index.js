const Sentry = require('@sentry/node');

const {saveRepairGateway, sentryParams} = require('../gateways');

module.exports = async function (req, res) {
  Sentry.init(sentryParams);

  let status;
  let result;

  try {
    result = await saveRepairGateway(req.body);
    status = 200;
  } catch (e) {
    Sentry.captureException(e);
    await Sentry.flush(2000);

    status = 500;
    result = new Error('Error saving');
  }

  res = {
    status: status,
    body: result
  };
};

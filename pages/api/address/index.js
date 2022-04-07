const Sentry = require('@sentry/node');

const {searchPropertiesGateway, sentryParams} = require('../gateways');

module.exports = async function handler (req, res) {
  console.log('HIT ADDRESS ENDPOINT')
  Sentry.init(sentryParams);


  let status;
  let results;

  try {
    results = await searchPropertiesGateway(req.query.postcode);
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

require('dotenv').config()

const axios = require('axios');

const env = process.env.API_ENV || 'development';

const sentryParams = {
  dsn: process.env.SENTRY_DSN,
  environment: env,
  dryRun: env == 'development'
};

const apiRequester = require('./apiRequester')(axios);

const searchPropertiesGateway = require('./SearchPropertiesGateway')(apiRequester.makeGetRequest);
const availableAppointmentsGateway = require('./AvailableAppointmentsGateway')(apiRequester.makeGetRequest);
const saveRepairGateway = require('./SaveRepairGateway')(apiRequester.makePostRequest);

module.exports = {
  searchPropertiesGateway,
  availableAppointmentsGateway,
  saveRepairGateway,
  sentryParams
};

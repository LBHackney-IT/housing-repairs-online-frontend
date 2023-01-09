// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN
const NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV
const NODE_ENV = process.env.NODE_ENV

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: NEXT_PUBLIC_APP_ENV,
  dryRun: NODE_ENV == 'development' || NEXT_PUBLIC_APP_ENV == 'test',
})

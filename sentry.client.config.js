// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
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

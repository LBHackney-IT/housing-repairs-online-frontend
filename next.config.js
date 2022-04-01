const path = require('path')

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports =  {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/report-repair',
        destination: '/report-repair/priority-list',
        permanent: true,
      },
    ]
  },

  images: {
    loader: 'default'
  },
};

module.exports = withSentryConfig(moduleExports, {
  authToken: process.env.SENTRY_AUTH_TOKEN || process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  dryRun: false,
  include: './.next'
});

const path = require('path');

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  reactStrictMode: true,
  distDir: 'build/_next',
  async redirects() {
    return [
      {
        source: '/report-repair',
        destination: '/report-repair/priority-list',
        permanent: true,
      }
    ];
  },

  images: {
    loader: 'default',
  },
  output: 'standalone'
};

module.exports = withSentryConfig(moduleExports, {
  authToken:
    process.env.SENTRY_AUTH_TOKEN || process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  dryRun:
    process.env.NODE_ENV == 'development' ||
    process.env.NEXT_PUBLIC_APP_ENV == 'test',
  include: './.next',
});

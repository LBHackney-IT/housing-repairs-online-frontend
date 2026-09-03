/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
    transformIgnorePatterns: [
    '/node_modules/(?!(lbh-frontend|govuk-frontend)/)',
  ],
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage'
};

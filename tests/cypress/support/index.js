// ***********************************************************
// This example support/[route].js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-react-selector';

// Prevent cookie banner for E2E tests
const COOKIE_ACCEPT_NAME = 'hrolAcceptCookies'
const COOKIE_ACCEPT_VALUE = 'Accepted'

Cypress.on("window:before:load", window => {
    window.document.cookie = `${COOKIE_ACCEPT_NAME}=${COOKIE_ACCEPT_VALUE}`
})

// Alternatively you can use CommonJS syntax:
// require('./commands')

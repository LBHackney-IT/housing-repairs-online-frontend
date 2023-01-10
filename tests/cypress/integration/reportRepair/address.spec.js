import {
  intercept_address_search,
  interceptPropertyEligibilityCheck,
} from '../../support/helpers'

function setup_addresses_search(setup_addresses_API) {
  setup_addresses_API()
  cy.get('button')
    .click()
    .then(() => {
      cy.get('input.govuk-input').type('SW1A 2AA')
      cy.get('button').click()
    })
  cy.get('[data-cy=address]', { timeout: 10000 }).then(($loadedSection) => {})
}

describe('address', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/report-repair/')
    cy.contains('Something else').click()
    cy.get('button').click()

    cy.contains('New repair').click()
    cy.get('button').click()

    cy.get('[data-cy=communal]', { timeout: 10000 }).then(($loadedSection) => {
      cy.contains('No').click()
    })
  })

  describe('Content and interaction', () => {
    beforeEach(() => {
      setup_addresses_search(intercept_address_search)
    })

    it('displays the label', () => {
      cy.contains('Select an address')
    })

    it('button displays correct text', () => {
      cy.get('button').contains('Continue')
    })

    it('contains a can\t find my address link', () => {
      cy.contains('I can\'t find my address').click()
      cy.url().should('include', '/report-repair/not-eligible')
    })

    context('When a user doesn\'t select anything', () => {
      it('an error should be shown', () => {
        cy.get('button').click()
        cy.contains('Required')
      })
    })

    context('When a user selects an option', () => {
      it('repair location page is shown if the property is eligible', () => {
        interceptPropertyEligibilityCheck(true)

        cy.get('select').select('1 Downing Street, London, SW1A 2AA')
        cy.get('button').click()
        cy.wait('@propertyEligibleTrue')
        cy.url().should('include', '/report-repair/repair-location')
      })

      it('ineligible property page is shown if the property is not eligible', () => {
        interceptPropertyEligibilityCheck(false)

        cy.get('select').select('1 Downing Street, London, SW1A 2AA')
        cy.get('button').click()
        cy.wait('@propertyEligibleFalse')
        cy.url().should(
          'include',
          '/report-repair/not-eligible-invalid-property'
        )
      })
    })
  })

  describe('API addresses with nulls', () => {
    context('When API addresses contain \'nulls\' they are not displayed', () => {
      it('address line 1 is null', () => {
        setup_addresses_search(() =>
          intercept_address_search(1, 'SW1A 2AA', true)
        )
        cy.get('select').contains(/^London, SW1A 2AA$/)
      })
      it('address line 2 is null', () => {
        setup_addresses_search(() =>
          intercept_address_search(1, 'SW1A 2AA', false, true)
        )
        cy.get('select').contains(/^1 Downing Street, SW1A 2AA$/)
      })
    })
  })
})

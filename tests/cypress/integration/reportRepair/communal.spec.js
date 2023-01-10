import { intercept_address_search } from '../../support/helpers'

describe('communal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/report-repair/')
    cy.contains('Something else').click()
    cy.get('button').click()

    cy.contains('New repair').click()
    cy.get('button').click()
  })

  it('displays the question', () => {
    cy.contains('Is the repair in a communal area?')
  })

  it('displays button with correct text', () => {
    cy.get('button').contains('Continue')
  })

  context('communal area prompt', () => {
    it('displays text', () => {
      cy.get('[data-testid=communal-area-prompt]').should(
        'have.contain',
        'What is a communal area?'
      )
    })

    it('displays instructions when clicked', () => {
      cy.get('details > summary')
        .click()
        .then(() => {
          cy.get('[data-testid=communal-area-info]')
            .should('be.visible')
            .should(
              'contain',
              'Communal repairs are usually in areas that people share'
            )
        })
    })
  })

  context('When a user doesn\'t select any option', () => {
    it('an error should be shown', () => {
      // confirm navigation
      cy.contains('Is the repair in a communal area?')

      cy.get('button')
        .click({ timeout: 1500 })
        .then(() => {
          cy.contains('Required')
        })
    })
  })

  context('When a user selects: Yes', () => {
    it('should redirect them to not eligible non emergency page', () => {
      cy.contains('Yes').click()
      cy.get('button').click()
      cy.url().should('include', '/report-repair/not-eligible-communal-repairs')
    })
  })

  context('When a user selects: No', () => {
    beforeEach(() => {
      intercept_address_search()
      cy.contains('No').click()
      cy.get('button').click()
    })
    it('should redirect them to postcode then address page respectively', () => {
      cy.url().should('include', '/report-repair/postcode')
    })
  })
})

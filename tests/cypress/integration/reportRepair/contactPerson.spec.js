describe('contactPerson', () => {
  before(() => {
    cy.visit('http://localhost:3000/report-repair/contact-person')
  })

  it('displays the question', () => {
    cy.contains('What number should we call, if we need to get in touch?')
  })

  it('displays input label', () => {
    cy.contains('Please enter a UK landline or mobile phone number')
  })

  it('displays button with correct text', () => {
    cy.get('button').contains('Continue')
  })

  context('When a user doesn\'t type anything', () => {
    it('an error should be shown', () => {
      cy.get('button').click()
      cy.contains('Required')
    })
  })

  context('When a user types in an invalid number', () => {
    it('an error is displayed', () => {
      cy.get('input').type('12345')
      cy.get('button').click()
      cy.contains('Not a valid uk number')
    })
  })

  context('When a user types invalid characters', () => {
    before(() => {
      cy.get('input').clear()
    })
    it('only numbers are accepted', () => {
      cy.get('input').type('§§§+442031234567§§§§§')
      cy.get('input').should('have.value', '+442031234567')
    })
  })
})

describe('priorityList', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/report-repair/')
  })

  it('displays the question title', () => {
    cy.contains('Please select one of the below')
  })

  context('When a user doesn\'t select any option', () => {
    it('an error should be shown', () => {
      cy.get('button').click()
      cy.contains('Required')
    })
  })

  context(
    'When a user selects: I can smell gas in or near the property',
    () => {
      it('should redirect them to smell gas page', () => {
        cy.contains('I can smell gas in or near the property').click()
        cy.get('button').click()
        cy.url().should('include', '/report-repair/smell-gas')
      })
    }
  )

  context('When a user selects: I have no heating in the property', () => {
    it('should redirect them to emergency page', () => {
      cy.contains('I have no heating in the property').click()
      cy.get('button').click()
      cy.url().should('include', '/report-repair/emergency-repair')
    })
  })

  context('When a user selects: I have no water in the property', () => {
    it('should redirect them to emergency page', () => {
      cy.contains('I have no water in the property').click()
      cy.get('button').click()
      cy.url().should('include', '/report-repair/emergency-repair')
    })
  })

  context('When a user selects: I have no electricity in the property', () => {
    it('should redirect them to emergency page', () => {
      cy.contains('I have no electricity in the property').click()
      cy.get('button').click()
      cy.url().should('include', '/report-repair/emergency-repair')
    })
  })

  context('When a user selects: I have a leak', () => {
    it('should redirect them to emergency page', () => {
      cy.contains('I have a leak').click()
      cy.get('button').click()
      cy.url().should('include', '/report-repair/emergency-repair')
    })
  })

  context(
    'When a user selects: I can\'t lock the doors or windows in my property',
    () => {
      it('should redirect them to emergency page', () => {
        cy.contains('I can\'t lock the doors or windows in my property').click()
        cy.get('button').click()
        cy.url().should('include', '/report-repair/emergency-repair')
      })
    }
  )

  context('When a user selects: I have exposed wires or sockets', () => {
    it('should redirect them to emergency page', () => {
      cy.contains('I have exposed wires or sockets').click()
      cy.get('button').click()
      cy.url().should('include', '/report-repair/emergency-repair')
    })
  })

  context(
    'When a user selects: My carbon monoxide or smoke alarm is beeping',
    () => {
      it('should redirect them to emergency page', () => {
        cy.contains('My carbon monoxide or smoke alarm is beeping').click()
        cy.get('button').click()
        cy.url().should('include', '/report-repair/emergency-repair')
      })
    }
  )

  context('When a user selects: Something else', () => {
    it('should redirect them to communal page', () => {
      cy.contains('Something else').click()
      cy.get('button').click()
      cy.url().should('include', '/report-repair/communal')
    })
  })

  context(
    'User uses back buttons to navigate out of an exit page and selects a different option',
    () => {
      it('should redirect the user to a different exit page', () => {
        cy.contains('I can smell gas in or near the property').click()
        cy.get('button').click()
        cy.url().should('include', '/report-repair/smell-gas')
        cy.go('back')
        cy.contains('I have no heating in the property').click()
        cy.get('button').click()
        cy.url().should('include', '/report-repair/emergency-repair')
      })
    }
  )

  context(
    'User uses back buttons to navigate out of an exit page and selects the same option',
    () => {
      it('should redirect the user to the same exit page', () => {
        cy.contains('I can smell gas in or near the property').click()
        cy.get('button').click()
        cy.url().should('include', '/report-repair/smell-gas')
        cy.go('back')
        cy.contains('I can smell gas in or near the property').click()
        cy.get('button').click()
        cy.url().should('include', '/report-repair/smell-gas')
      })
    }
  )

  context('User presses the back button twice from an exit page', () => {
    it('should redirect the user to the home page', () => {
      cy.contains('I can smell gas in or near the property').click()
      cy.get('button').click()
      cy.contains('Back').click()
      cy.url().should('eq', 'http://localhost:3000/report-repair/priority-list')
      cy.contains('Back').click()
      cy.url().should('eq', 'http://localhost:3000/')
    })
  })

  context('When a user proceeds to next step and goes back', () => {
    it('should have user\'s selection reselected', () => {
      cy.contains('Something else').click()
      cy.get('button').click()
      cy.contains('Back').click()
      cy.get('[value="non-emergency/9"]').should('be.checked')
    })
  })
})

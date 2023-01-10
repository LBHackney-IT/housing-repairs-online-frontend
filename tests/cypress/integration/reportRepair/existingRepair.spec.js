import { intercept_address_search } from '../../support/helpers';

describe('existingRepair', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/report-repair/');
    cy.contains('Something else').click();
    cy.get('button').click();
  });

  it('displays the question', () => {
    cy.contains(
      'Is this a new repair request or have you reported this before?'
    );
  });

  it('displays button with correct text', () => {
    cy.get('button').contains('Continue');
  });

  context('When a user doesn\'t select any option', () => {
    it('an error should be shown', () => {
      // Confirm navigation
      cy.contains(
        'Is this a new repair request or have you reported this before?'
      );

      cy.get('button')
        .click({ timeout: 1000 })
        .then(() => {
          cy.contains('Required');
        });
    });
  });

  context('When a user selects: I have reported this repair before', () => {
    it('should redirect them to not eligible non previously reported page', () => {
      cy.contains('I have reported this repair before').click();
      cy.get('button').click();
      cy.url().should(
        'include',
        '/report-repair/not-eligible-previously-reported'
      );
    });
  });

  context('When a user selects: New repair', () => {
    beforeEach(() => {
      intercept_address_search();
      cy.contains('New repair').click();
      cy.get('button').click();
    });
    it('should redirect them to communal page', () => {
      cy.url().should('include', '/report-repair/communal');
    });
  });
});

import { intercept_check_maintenance_mode } from '../support/helpers'

describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('displays service title', () => {
    cy.contains('Housing Repairs Online');
  });

  it('displays correct phase banner', () => {
    cy.contains('This is our new website design - it\'s work in progress');
  });

  it('displays a start button', () => {
    cy.get('a').contains('Start now').should('have.attr', 'href', '/report-repair/priority-list');
  });

  it('has an accessibility link', () => {
    cy.get('a').contains('Accessibility').should('have.attr', 'href', 'https://hackney.gov.uk/accessibility-help');
  });

  it('redirects to maintenance page when enabled', () => {
    intercept_check_maintenance_mode(true);
    cy.visit('http://localhost:3000');

    cy.wait(500)
    
    cy.get('body').should('contain', 'Temporarily Unavailable');
    cy.url().should('eq', 'http://localhost:3000/service-unavailable')
  })

  it('doesn\'t redirect to maintenance page when disabled', () => {
    intercept_check_maintenance_mode(false);
    cy.visit('http://localhost:3000');

    cy.wait(300)

    cy.get('h1').contains('Request a repair');
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('doesn\'t redirect to maintenance page when request fails', () => {
    intercept_check_maintenance_mode(false, 500);
    cy.visit('http://localhost:3000');

    cy.wait(300)

    cy.get('h1').contains('Request a repair');
    cy.url().should('eq', 'http://localhost:3000/')
  })
});

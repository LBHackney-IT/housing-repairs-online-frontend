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

  it('displays a smell gas warning on the landing page', () => {
    cy.get('[data-testid=landing-page-gas-warning]').should(
      'have.contain',
      'If you suspect you have a gas leak, you must report it immediately to the Gas Emergency Service on 0800 111 999 or via textphone (minicom) on 0800 371 787'
    );
  });

  it('displays a emergency repair warning on the landing page', () => {
    cy.get('[data-testid=landing-page-emergency-warning]').should(
      'have.contain',
      'For other emergency repairs, please call customer services'
    );
  });

  context('emergency prompt', () => {
    it('displays text', () => {
      cy.get('[data-testid=landing-page-emergency-prompt]').should(
        'have.contain',
        'What is an emergency?'
      );
    });

    it('displays instructions when clicked', () => {
      cy.get('[data-testid=landing-page-emergency-prompt] summary')
        .click()
        .then(() => {
          cy.get('[data-testid=landing-page-emergency-info]')
            .should('be.visible')
        });
    });
  });

  it('displays a start button', () => {
    cy.get('a').contains('Start now').should('have.attr', 'href', '/report-repair/priority-list');
  });

  it('has an accessibility link', () => {
    cy.get('a').contains('Accessibility').should('have.attr', 'href', 'https://hackney.gov.uk/accessibility-help');
  });
});

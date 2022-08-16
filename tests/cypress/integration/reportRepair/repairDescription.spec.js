describe('repair description', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/report-repair/repair-description');
  });

  it('displays the question', () => {
    cy.contains('Describe the repair required in more detail');
  });

  it('displays what the description should include', () => {
    cy.contains('the size and location of the repair');
    cy.contains('the source of the repair');
    cy.contains('when did the issue occur');
    cy.contains('how many items are damaged, for example 3 floor tiles');
  });

  it('displays "report one repair" disclaimer', () => {
    cy.contains('Please report only one repair at a time. You will have a ' +
      'chance to report another repair after this one.');
  });

  it('displays button with correct text', () => {
    cy.get('button').contains('Continue');
  });

  context('When a user doesn\'t type anything', ()=>{
    it('an error should be shown',  () => {
      cy.get('button').click()
      cy.contains('Required');
    });
  });

  context('When a types a description that\'s too long', ()=>{
    it('an error is shown',  () => {
      cy.get('textarea').type('Eius postea venit saepius arcessitus. dein ' +
        'syria per speciosam interpatet diffusa planitiem. hanc nobilitat ' +
        'ochia, mundo cognita civitas, cui non certaverit alia advecticiis ' +
        'ita adfluere copiis et internis, et laodicia et apamia itidemque ' +
        'seleucia iam inde a primis auspiciis florentissimae.');
      cy.contains('Description must be 255 characters or fewer');
    });
  });

  context('When a user uploads an image with the wrong format', ()=>{
    it('an error is shown', () => {
      cy.get('input').attachFile('wrong.png');
      cy.contains('The selected file must be a JPG');
    });
  });

  context('When a user uploads a large image', ()=>{
    it('an error is shown', () => {
      cy.get('input').attachFile('large.jpg');
      cy.contains('The selected file must be smaller than 10MB. Your file size is: 12.02MB');
    });
  });

  context('When a user uploads a good image', ()=>{
    it('the image is shown', () => {
      cy.get('input').attachFile('good.jpg');
      cy.get('img').should('be.visible');
      cy.get('button.govuk-button--warning').contains('Delete');
      cy.get('input').should('not.exist');
    });

    it('allows user to replace image ',  () => {
      cy.get('input').attachFile('good.jpg');
      cy.get('button.govuk-button--warning').contains('Delete').click();
      cy.get('input').should('exist');
    });
  });

  context('When a types an acceptable description that\'s too long', ()=>{
    it('Remaining characters are counted correctly',  () => {
      cy.get('#description').type('Eius postea venit saepius arcessitus. dein ' +
        'syria per speciosam interpatet diffusa planitiem. hanc nobilitat ' +
        'seleucia iam inde a primis auspiciis florentissimae.');
      cy.contains('You have 95 characters remaining');
    });
  });
});

describe('contactPerson', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/report-repair/contact-person');
  });

  it('displays the question', () => {
    cy.contains('Who should we contact, if we need to get in touch?');
  });

  it('displays input label', () => {
    cy.contains('Please enter a UK landline or mobile phone number');
  });

  it('displays button with correct text', () => {
    cy.get('button').contains('Continue');
  });

  context('When a user doesn\'t type anything', ()=>{
    it('an error should be shown',  () => {
      cy.get('button').click()
      cy.contains('You must enter a contact name');
    });
  });

  context('When a user types in an invalid number', ()=>{
    it('an error is displayed', () => {
      cy.get('[id=phone-number]').type('12345');
      cy.get('[id=contact-name]').type('Dave');
      cy.get('button').click()
      cy.contains('Not a valid uk number');
    });
  });

  context('When a user types invalid characters', ()=>{
    beforeEach(()=>{
      cy.get('[id=phone-number]').clear();
      cy.get('[id=contact-name]').clear();
    })
    it('only numbers are accepted', () => {
      cy.get('[id=phone-number]').type('§§§+447720926562§§§§§');
      cy.get('[id=phone-number]').should('have.value', '+447720926562')
    });
  });
});

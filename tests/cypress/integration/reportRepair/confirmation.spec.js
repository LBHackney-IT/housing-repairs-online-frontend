import {
  intercept_address_search,
  intercept_availability_search,
  selectRadioOptionAndContinue,
  navigateToPageTypeInputTextAndContinue,
  navigateToPageTypeInputByIdAndContinue,
  intercept_save_repair,
  interceptPropertyEligibilityCheck
} from '../../support/helpers';

const address = '1 Downing Street, London, SW1A 2AA';
const repairDescription = 'Eius postea venit saepius arcessitus.'
const phoneNumber = '07512345678';
const email = 'harrypotter@hogwarts.com';
const repairID = '1234ABC'
const contactName = 'Dave'

function completeJourney(contactPhone = false) {

  cy.visit('http://localhost:3000/report-repair/');

  selectRadioOptionAndContinue({
    page: 'priority-list',
    option: 'Something else'
  })

  selectRadioOptionAndContinue({
    page: 'existing-repair', option: 'New repair'
  })

  selectRadioOptionAndContinue({
    page: 'communal', option: 'No'
  })

  navigateToPageTypeInputTextAndContinue({
    page: 'postcode', inputText: 'SW1A 2AA'
  })

  cy.get('[data-cy=address]', {timeout: 10000}).then(() => {
    cy.get('select').select(address)
    cy.get('button').click();
  });

  selectRadioOptionAndContinue({
    page: 'repair-location', option: 'Kitchen'
  })

  selectRadioOptionAndContinue({
    page: 'repair-problem',
    option: 'Cupboards, including damaged cupboard doors'
  })

  selectRadioOptionAndContinue({
    page: 'repair-problem-best-description', option: 'Hanging door'
  })

  cy.get('[data-cy=repair-description]', {timeout: 10000}).then(() => {
    cy.get('textarea').type(repairDescription);
    cy.get('input').attachFile('good.jpg');
    cy.get('button').contains('Continue').click();
  });

  navigateToPageTypeInputByIdAndContinue({
    page: 'contact-person',
    id: 'phone-number',
    inputText: phoneNumber
  })

  navigateToPageTypeInputByIdAndContinue({
    page: 'contact-person',
    id: 'contact-name',
    inputText: contactName
  })

  cy.get('[data-cy=contact-details]', {timeout: 10000}).then(() => {
    if (contactPhone) {
      cy.contains('Text message (recommended)').click().then(() => {
        cy.get('input#contactDetails-text').type(phoneNumber);
      })
    } else {
      cy.contains('Email').click().then(() => {
        cy.get('input#contactDetails-email').type(email);
      })
    }
    cy.get('button').click();
  });

  cy.get('[data-cy=repair-availability]', {timeout: 10000}).then(() => {
    cy.get('[data-cy=availability-slot-0-0]').click();
    cy.get('button').click();
  });

  cy.get('[data-cy=summary]', {timeout: 10000}).then(() => {
    cy.get('button').click();
  });
}

describe('confirmation', () => {
  beforeEach(() => {
    intercept_availability_search();
    intercept_address_search();
    interceptPropertyEligibilityCheck(true);
    intercept_save_repair(repairID);
    completeJourney();
  });

  it('Displays repair id', () => {
    cy.get('.govuk-panel').contains('Repair request complete');
    cy.get('.govuk-panel').contains(repairID);
  });

  it('Displays report another issue link', () => {
    cy.get('a', { timeout: 1000}).contains('Report another issue').should('have.attr', 'href', '/');
  });

  it('Does not display the back button', () => {
    cy.get('.govuk-back-link').should('not.exist')
  });

  context('when user sends confirmation via email', ()=>{
    it('Displays where the confirmation was sent to', () => {
      cy.contains('We have sent a confirmation to ' + email);
    });
  });

  context('when user sends confirmation via text', ()=>{
    beforeEach(() => {
      intercept_availability_search();
      intercept_address_search();
      interceptPropertyEligibilityCheck(true);
      intercept_save_repair(repairID);
      completeJourney(true);
    });

    it('Displays where the confirmation was sent to', () => {
      cy.contains('We have sent a confirmation to ' + phoneNumber);
    });
  });

});

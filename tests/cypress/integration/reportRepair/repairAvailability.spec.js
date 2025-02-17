import {
  interceptPropertyEligibilityCheck,
  intercept_address_search,
  intercept_availability_search,
  selectRadioOptionAndContinue,
  navigateToPageTypeInputTextAndContinue,
  navigateToPageTypeInputByIdAndContinue
} from '../../support/helpers';


describe('repair availability', () => {
  describe('with availability', () =>
  {
    beforeEach(() => {
      intercept_availability_search();
      cy.visit('http://localhost:3000/report-repair/repair-availability');
    });

    it('api is called without from date ', () => {
      cy.wait('@availability')
        .its('request.url')
        .should('not.include', 'fromDate=')
    });

    it('displays the question', () => {
      cy.contains('When are you available?');
    });

    it('displays information about who needs to be home', () => {
      cy.contains('A responsible adult must be at the property for all of the ' +
        'repair appointment time slot and during the repair appointment');
    });

    it('displays available time slots', () => {
      cy.contains('Please select a suitable time slot');
      cy.contains('21st July 2017');
      cy.contains('1:00pm to 6:00pm');
      cy.contains('22nd July 2017');
      cy.contains('10:00am to 1:00pm');
      cy.contains('1:00pm to 6:00pm');
    });

    it('displays next button with correct text', () => {
      cy.get('a.govuk-button').contains('Next 5 days');
    });

    it('displays continue button with correct text', () => {
      cy.get('button').contains('Continue');
    });

    context('when user loads more timeslots', () => {
      beforeEach(() => {
        intercept_availability_search();
        cy.get('a.govuk-button').click();
        cy.wait(100)
      });

      it('api is called with appropriate from date ', () => {
        cy.wait('@availability')
          .its('request.url')
          .should('include', 'fromDate=2017-07-23')
      });

      it('displays previous button with correct text', () => {
        cy.get('a.govuk-button').contains('Previous 5 days');
      });
    })
    context('When a user select anything', () => {
      it('an error should be shown', () => {
        cy.contains('Continue').click()
        cy.contains('Required');
      });
    });
  });

  describe('without availability', () => {
    beforeEach(() => {
      intercept_availability_search([]);
      cy.visit('http://localhost:3000/report-repair/repair-availability');
    })

    it('displays unable to book page', () => {
      cy.wait('@availability');
      cy.contains('Your repair could not be booked')
    });

  });

  describe('for SOR with only location and problem', () => {
    const address = '1 Downing Street, London, SW1A 2AA';
    const repairDescription = 'Eius postea venit saepius arcessitus.'
    const phoneNumber = '02085548333';
    const email = 'harrypotter@hogwarts.com';
    const contactName = 'Elliot Carver'

    beforeEach(() => {
      intercept_availability_search();
      intercept_address_search();
      interceptPropertyEligibilityCheck(true);
      cy.visit('http://localhost:3000/report-repair/');

      selectRadioOptionAndContinue({
        page: 'priority-list',
        option:'Something else'
      })

      selectRadioOptionAndContinue({
        page: 'existing-repair',
        option:'New repair'
      })

      selectRadioOptionAndContinue({
        page: 'communal', option:'No'
      })

      navigateToPageTypeInputTextAndContinue({
        page: 'postcode', inputText:'SW1A 2AA'
      })

      cy.get('[data-cy=address]', {timeout: 10000}).then(() => {
        cy.get('select').select(address)
        cy.get('button').click();
      });

      selectRadioOptionAndContinue({
        page: 'repair-location', option:'Kitchen'
      })

      selectRadioOptionAndContinue({
        page: 'repair-problem', option:'Damaged worktop'
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
        cy.get('input#contactDetails-1').click().then(()=> {
          cy.get('input#contactDetails-email').type(email);
        })
        cy.get('button').click();
      });
    });

    it('api is called without repair issue', () => {
      cy.wait('@availability')
        .its('request.url')
        .should('not.include', 'repairIssue=')
    });
  })
});

import {
  intercept_address_search,
  intercept_availability_search,
  navigateToPageSelectRadioOptionAndContinue,
  navigateToPageTypeInputTextAndContinue,
  navigateToPageTypeInputByIdAndContinue,
  convertDateToDisplayDate,
  continueOnPage,
  interceptPropertyEligibilityCheck
} from '../../support/helpers';

describe('summary', () => {
  let timeSlot = ''
  const address = '1 Downing Street, London, SW1A 2AA';
  const repairDescription = 'Eius postea venit saepius arcessitus.'
  const phoneNumber = '02085548333';
  const email = 'harrypotter@hogwarts.com';
  const contactName = "Elliot Carver"

  beforeEach(() => {
    intercept_availability_search();
    intercept_address_search();
    interceptPropertyEligibilityCheck(true)
    cy.visit('http://localhost:3000/report-repair/');

    navigateToPageSelectRadioOptionAndContinue({
      page: 'priority-list',
      option:'Something else'
    })

    navigateToPageSelectRadioOptionAndContinue({
      page: 'communal', option:'No'
    })

    navigateToPageTypeInputTextAndContinue({
      page: 'postcode', inputText:'SW1A 2AA'
    })

    cy.get('[data-cy=address]', {timeout: 10000}).then(() => {
      cy.get('select').select(address)
      cy.get('button').click();
    });

    navigateToPageSelectRadioOptionAndContinue({
      page: 'repair-location', option:'Kitchen'
    })

    navigateToPageSelectRadioOptionAndContinue({
      page: 'repair-problem', option:'Cupboards, including damaged cupboard doors'
    })

    navigateToPageSelectRadioOptionAndContinue({
      page: 'repair-problem-best-description', option:'Hanging door'
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

    cy.get('[data-cy=repair-availability]', {timeout: 10000}).then(() => {
      cy.get('[data-cy=availability-slot-0-0]').invoke('val').then(value =>{
        timeSlot = value;
      })
      cy.get('[data-cy=availability-slot-0-0]').click();
      cy.get('button').click();
    });
  });

  it('Displays all of the content', () => {
    cy.contains('Request summary');
    cy.contains('Personal details');

    cy.contains('Repair address');
    cy.contains(address);
    cy.get('a[href*="postcode"]').contains('Change')

    cy.contains('Appointment contact number');
    cy.contains(phoneNumber);
    cy.get('a[href*="contact-person"]').contains('Change')

    cy.contains('Repair details')
    cy.contains('Where is the repair?')
    cy.contains('Kitchen')
    cy.get('a[href*="repair-location"]').contains('Change')
    cy.contains('What is the repair?')
    cy.contains('Cupboards, including damaged cupboard doors')
    cy.get('a[href*="repair-kitchen-problems"]').contains('Change')
    cy.contains('What best describes the repair?')
    cy.contains('Hanging door')
    cy.get('a[href*="repair-kitchen-cupboard-problems"]').contains('Change')
    cy.contains('Description')
    cy.contains(repairDescription)
    cy.get('a[href*="repair-description"]').contains('Change');
  });

  context('Personal Details', () => {
    it('allows you to change the address', () => {
      let newAddress = '2 Downing Street, London, SW1A 2AA'
      cy.get('a[href*="postcode"]').contains('Change').click()

      cy.location('href').should('eq', 'http://localhost:3000/report-repair/postcode')
      cy.get('button').click();

      cy.get('[data-cy=address]', {timeout: 10000}).then(() => {
        cy.get('select').select(newAddress);
        cy.get('button').click();
      });
      cy.get('[data-cy=repair-location]', {timeout: 10000}).then(() => {
        cy.get('button').click();
      });
      cy.get('[data-cy=repair-problem]', {timeout: 10000}).then(() => {
        cy.get('button').click();
      });
      cy.get('[data-cy=repair-problem-best-description]', {timeout: 10000}).then(() => {
        cy.get('button').click();
      });
      cy.get('[data-cy=repair-description]', {timeout: 10000}).then(() => {
        cy.get('button').contains('Continue').click();
      });
      cy.get('[data-cy=contact-person]', {timeout: 10000}).then(() => {
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
        cy.get('button').click();
      });
      cy.get('[data-cy=contact-details]', {timeout: 10000}).then(() => {
        cy.get('button').click();
      });
      cy.get('[data-cy=repair-availability]', {timeout: 10000}).then(() => {
        cy.get('button').click();
      });
      cy.contains('2 Downing Street, London, SW1A 2AA')
    });
    it('allows you to change appointment contact number', () => {
      let newNumber = '02087748222';
      cy.get('a[href*="contact-person"]').contains('Change').click();

      cy.location('href').should('eq', 'http://localhost:3000/report-repair/contact-person');
      cy.get('input').clear();
      cy.get('input').type(newNumber);
      cy.get('button').click();
      cy.get('[data-cy=contact-details]', {timeout: 10000}).then(() => {
        cy.get('button').click();
      });
      cy.get('[data-cy=repair-availability]', {timeout: 10000}).then(() => {
        cy.get('button').click();
      });
      cy.contains(newNumber);
    });
  });
  context('Repair Details', () => {
    it('allows you to change location and problem',  () =>{
      cy.get('a[href*="repair-location"]').contains('Change').click();
      navigateToPageSelectRadioOptionAndContinue({
        page: 'repair-location', option:'Bathroom'
      })
      navigateToPageSelectRadioOptionAndContinue({
        page: 'repair-problem', option:'Bath, including taps'
      });
      navigateToPageSelectRadioOptionAndContinue({
        page: 'repair-problem-best-description', option:'Bath taps'
      })

      continueOnPage('repair-description');

      continueOnPage('contact-person');
      continueOnPage('contact-details');
      continueOnPage('repair-availability');
      cy.contains('Bathroom')
      cy.contains('What is the repair?')
      cy.contains('Bath taps')

      cy.get('a[href*="bath-problems"]').contains('Change').click();
      cy.location('href').should('eq', 'http://localhost:3000/report-repair/bath-problems');

      navigateToPageSelectRadioOptionAndContinue({
        page: 'repair-problem-best-description', option:'Bath taps'
      })
      continueOnPage('repair-description');
      continueOnPage('contact-person');
      continueOnPage('contact-details');
      continueOnPage('repair-availability');

      cy.contains('Bath taps')
    });

    it('allows you to navigate to change the repair location page ', () => {
      cy.get('a[href*="repair-location"]').contains('Change').click();
      cy.location('href').should('eq', 'http://localhost:3000/report-repair/repair-location');
    });

    it('allows you to navigate to change what is the problem page', () => {
      cy.get('a[href*="repair-kitchen-problems"]').contains('Change').click();
      cy.location('href').should('eq', 'http://localhost:3000/report-repair/repair-kitchen-problems');
    });

    it('allows you to change the description text', () => {
      let newText = 'loremmmm ipsummm'
      cy.contains(newText).should('not.exist')
      cy.get('a[href*="repair-description"]').contains('Change').click();
      cy.location('href').should('eq', 'http://localhost:3000/report-repair/repair-description');
      cy.get('textarea').clear();
      cy.get('textarea').type(newText);
      cy.get('button').contains('Continue').click();
      cy.get('button').contains('Continue').click();
      cy.get('[data-cy=contact-details]', {timeout: 10000}).then(() => {
        cy.get('button').click();
      });
      cy.get('[data-cy=repair-availability]', {timeout: 10000}).then(() => {
        cy.get('button').click();
      });
      cy.contains(newText);
    });
  });
  context('Appointment Details', () => {
    it('allows you to change the date', () => {
      cy.contains(convertDateToDisplayDate(timeSlot));
      cy.get('a[href*="repair-availability"]').contains('Change').click()
      cy.location('href').should('eq', 'http://localhost:3000/report-repair/repair-availability');
      cy.get('[data-cy=repair-availability]', {timeout: 10000}).then(() => {
        cy.get('[data-cy=availability-slot-1-0]').invoke('val').then(value =>{
          cy.get('[data-cy=availability-slot-1-0]').click();
          cy.get('button').click();
          cy.contains(convertDateToDisplayDate(value));
          cy.get('button').click();
        })
      });

    });
    it('allows you to change the confirmation contact details', () => {
      let newEmail = 'dumbledoor@hogwarts.com'
      cy.contains(newEmail).should('not.exist');
      cy.get('a[href*="contact-details"]').contains('Change').click();
      cy.location('href').should('eq', 'http://localhost:3000/report-repair/contact-details');
      cy.get('input#contactDetails-1').click().then(()=> {
        cy.get('input#contactDetails-email').clear();
        cy.get('input#contactDetails-email').type(newEmail);
      })
      cy.get('button').click();
      cy.get('[data-cy=repair-availability]', {timeout: 10000}).then(() => {
        cy.get('[data-cy=availability-slot-0-0]').click();
        cy.get('button').click();
      });
      cy.get('button').click();
      cy.contains(newEmail);
    });
  });
});

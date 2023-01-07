import dummyAppointments from '../../fixtures/availableAppointments.json';
import moment from 'moment';

function intercept_address_search(
  numberOfResults = 2,
  postcode='SW1A 2AA',
  nullAddressLine1 = false,
  nullAddressLine2 = false,
  locationId = 47009990
) {
  const api_url = 'http://localhost:3000/api';
  const response = [];

  for (let i = 0; i < numberOfResults; i++) {
    response.push({
      addressLine1: !nullAddressLine1 ? `${i+1} Downing Street` : undefined,
      addressLine2: !nullAddressLine2 ? 'London' : undefined,
      postCode: postcode,
      locationId: locationId
    });
  }
  cy.intercept('GET', `${api_url}/address?*`, {
    statusCode: 201,
    body: response
  }).as('address');
}

function intercept_availability_search(appointments = dummyAppointments) {
  const api_url = 'http://localhost:3000/api';

  cy.intercept('GET', `${api_url}/availability*`, {
    statusCode: 201,
    body: appointments
  }).as('availability');
}

function intercept_save_repair(repairId) {
  const api_url = 'http://localhost:3000/api';

  cy.intercept('POST', `${api_url}/repair`, {
    statusCode: 201,
    body: repairId
  }).as('saveRepair');
}

const navigateToPageSelectRadioOptionAndContinue = ({page, option}) => {
  cy.get(`[data-cy=${page}]`, {timeout: 10000}).then(() => {
    cy.contains(option).click();
    cy.get('button').click();
  });
}
const continueOnPage = (page) => {
  cy.get(`[data-cy=${page}]`, {timeout: 10000}).then(() => {
    cy.get('button').contains('Continue').click();
  });
}
const navigateToPageTypeInputTextAndContinue = ({page, inputText}) => {
  cy.get(`[data-cy=${page}]`, {timeout: 10000}).then(() => {
    cy.get('input.govuk-input').type(inputText);
    cy.get('button').click();
  });
}

const navigateToPageTypeInputByIdAndContinue = ({page, id, inputText}) => {
    cy.get(`[id=${id}]`).type(inputText);
    cy.get('button').click();
}

const navigateToPageClearAndTypeInputByIdAndContinue = ({page, id, inputText}) => {
  cy.get(`[id=${id}]`).clear()
  cy.get(`[id=${id}]`).type(inputText);
  cy.get('button').click();
}

const convertDateToDisplayDate = (date) => {
  let dateArray = date?.split('-')
  let startDateTime = moment.unix(dateArray[0])
  let endDateTime = moment.unix(dateArray[1])
  const dateString = startDateTime.format('Do MMMM YYYY')
  const startTime = startDateTime.format('h:mma');
  const endTime = endDateTime.format('h:mma')
  const timeString = `${startTime} to ${endTime}`
  return `${dateString} between ${timeString}`
}

const navigateToLocation = () => {
  intercept_address_search();
  interceptPropertyEligibilityCheck(true);
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
    cy.get('select').select('1 Downing Street, London, SW1A 2AA')
    cy.get('button').click();
  });
}

function intercept_check_maintenance_mode(enable, statusCode = 200) {
  const api_url = 'http://localhost:3000/api';

  cy.intercept('GET', `${api_url}/maintenance`, {
    statusCode: statusCode,
    body: {
      maintenanceModeEnabled: enable
    }
  }).as('maintenance');
}

function interceptPropertyEligibilityCheck(propertyEligible) {
  const propertyEligibleResult = {
    propertyEligible: propertyEligible,
    reason: 'Example Reason'
  };

  const identifier = propertyEligible ? 'propertyEligibleTrue' : 'propertyEligibleFalse'

  cy.intercept('GET', 'http://localhost:3000/api/propertyeligible?propertyId=47009990', {
    statusCode: 200,
    body: propertyEligibleResult
  }).as(identifier);
}

export {
  intercept_address_search,
  intercept_availability_search,
  navigateToPageSelectRadioOptionAndContinue,
  navigateToPageTypeInputTextAndContinue,
  navigateToPageTypeInputByIdAndContinue,
  convertDateToDisplayDate,
  intercept_save_repair,
  continueOnPage,
  navigateToLocation,
  intercept_check_maintenance_mode,
  interceptPropertyEligibilityCheck
}

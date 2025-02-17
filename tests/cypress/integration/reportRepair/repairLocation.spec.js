import {navigateToLocation} from '../../support/helpers';

describe('repairLocation', () => {
  beforeEach(() => {
    navigateToLocation();
  });

  it('displays the repair location question', () => {
    cy.contains('Where is the repair?');
  });

  context('repair location options', () => {
    it('displays "Kitchen" as an option', () => {
      cy.contains('Kitchen');
    });

    it('displays "Bathroom" as an option', () => {
      cy.contains('Bathroom');
    });

    it('displays "Bedroom" as an option', () => {
      cy.contains('Bedroom');
    });

    it('displays "Living Areas" as an option', () => {
      cy.contains('Living Areas');
    });

    it('does not display the "Outside" option', () => {
      cy.contains('Outside').should('not.exist');
    });
  });

  context('When a user doesn\'t select anything', ()=>{
    it('should show required message',  () => {
      cy.get('button').click().then(()=>{
        cy.contains('Required');
      });
    });
  });

  context('When a user selects: Kitchen', ()=>{
    beforeEach(()=>{
      navigateToLocation();
    })
    context('by clicking the label', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        cy.contains('Kitchen').click();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-kitchen-problems');
      });
    });
    context('by checking the radio button', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        cy.get('[value="kitchen"]').check();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-kitchen-problems');
      });
    });
  });

  context('When a user selects: Bathroom', ()=>{
    beforeEach(()=>{
      navigateToLocation();
    })
    context('by clicking the label', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        cy.contains('Bathroom').click();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-bathroom-problems');
      });
    });
    context('by checking the radio button', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        cy.get('[value="bathroom"]').check();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-bathroom-problems');
      });
    });
  });

  context('When a user selects: Bedroom', ()=>{
    beforeEach(()=>{
      navigateToLocation();
    })
    context('by clicking the label', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        cy.contains('Bedroom').click();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-bedroom-problems');
      });
    });
    context('by checking the radio button', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        cy.get('[value="bedroom"]').check();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-bedroom-problems');
      });
    });
  });

  context('When a user selects: Living Areas', ()=>{
    beforeEach(()=>{
      navigateToLocation();
    })
    context('by clicking the label', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        cy.contains('Living Areas').click();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-living-areas-problems');
      });
    });
    context('by checking the radio button', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        cy.get('[value="livingAreas"]').check();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-living-areas-problems');
      });
    });
  });

  context('When a user selects an option', ()=>{
    beforeEach(()=>{
      navigateToLocation();
    })

    it('should be selected when they navigate back to the page',  () => {
      cy.contains('Kitchen').click();
      cy.get('button').click();
      cy.get('[data-cy=repair-problem]', {timeout: 10000}).then(() => {
        cy.contains('Back').click({force: true});
      });
      cy.url().should('eq', 'http://localhost:3000/report-repair/repair-location');
      cy.get('[value="kitchen"]').should('be.checked')
    });
  });
});

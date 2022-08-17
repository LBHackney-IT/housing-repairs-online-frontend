import {
  navigateToLocation
} from '../../support/helpers';

const genericWhatIsTheProblemOptions = () => {
  it('displays the repair problem question', () => {
    cy.contains('What is the repair?');
  });

  it('displays a "walls" option', () => {
    cy.contains('Walls, floor or ceiling, excluding damp');
  });

  it('displays a "electrics" option', () => {
    cy.contains('Electrics, including lights and switches');
  });

}
describe('repairProblem', () => {

  context('kitchen', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Kitchen').click();
      cy.get('button').click();
    });

    it('displays the repair problem question', () => {
      cy.contains('What is the repair?');
    });

    it('displays a "cupboards" option', () => {
      cy.contains('Cupboards, including damaged cupboard doors');
    });

    it('displays a "walls" option', () => {
      cy.contains('Walls, floor or ceiling, excluding damp');
    });

    it('displays a "electrical" option', () => {
      cy.contains('Electrical, including extractor fans and lightbulbs');
    });

    it('displays a "worktop" option', () => {
      cy.contains('Damaged worktop');
    });

    it('displays a "sink" option', () => {
      cy.contains('Sink, including taps and drainage');
    });

    it('displays a "door" option', () => {
      cy.contains('Damaged or stuck doors');
    });

    it('displays a "heating" option', () => {
      cy.contains('Heating or hot water');
    });

    it('displays a "window" option', () => {
      cy.contains('Damaged or stuck windows');
    });

    it('displays a "Damp or mould" option', () => {
      cy.contains('Damp or mould');
    });
  });

  context('Bathroom', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Bathroom').click();
      cy.get('button').click();
    });

    it('displays the repair problem question', () => {
      cy.contains('What is the repair?');
    });

    it('displays a "walls" option', () => {
      cy.contains('Walls, floor or ceiling, excluding damp');
    });

    it('displays a "bath" option', () => {
      cy.contains('Bath, including taps');
    });

    it('displays a "sink" option', () => {
      cy.contains('Sink, including taps and drainage');
    });

    it('displays a "electrics" option', () => {
      cy.contains('Electrics, including extractor fan and pull cords');
    });

    it('displays a "window" option', () => {
      cy.contains('Damaged or stuck windows');
    });

    it('displays a "Damp or mould" option', () => {
      cy.contains('Damp or mould');
    });

    it('displays a "door" option', () => {
      cy.contains('Damaged or stuck doors');
    });

    it('displays a "shower" option', () => {
      cy.contains('Shower, including the tray and shower door');
    });

    it('displays a "toilet" option', () => {
      cy.contains('Toilet');
    });

    it('displays a "heating" option', () => {
      cy.contains('Heating or hot water');
    });
  });

  context('Bedroom', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Bedroom').click();
      cy.get('button').click();
    });

    genericWhatIsTheProblemOptions();

    it('displays a "window" option', () => {
      cy.contains('Damaged or stuck windows');
    });

    it('displays a "door" option', () => {
      cy.contains('Damaged or stuck doors');
    });

    it('displays a "Damp or mould" option', () => {
      cy.contains('Damp or mould');
    });

    it('displays a "Heating" option', () => {
      cy.contains('Heating');
    });
  });

  context('Living Areas', () => {
    before(() => {
      navigateToLocation();
      cy.contains('Living Areas').click();
      cy.get('button').click();
    });

    it('displays a "walls" option', () => {
      genericWhatIsTheProblemOptions();
    });

    it('displays a "window" option', () => {
      cy.contains('Damaged or stuck windows');
    });

    it('displays a "door" option', () => {
      cy.contains('Damaged or stuck doors');
    });

    it('displays a "Damp or mould" option', () => {
      cy.contains('Damp or mould');
    });

    it('displays a "Stairs (including handrail)" option', () => {
      cy.contains('Stairs (including handrail)');
    });

    it('displays a "Heating" option', () => {
      cy.contains('Heating');
    });
  });

  context('Outside', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Outside').click();
      cy.get('button').click();
    });

    it('displays the repair problem question', () => {
      cy.contains('What is the repair?');
    });

    it('displays a "Door, including shed and outhouse" option', () => {
      cy.contains('Door, including shed and outhouse');
    });

    it('displays a "Outdoor security lights" option', () => {
      cy.contains('Outdoor security lights');
    });

    it('displays a "Roof, including insulation and shed roof" option', () => {
      cy.contains('Roof, including insulation and shed roof')
    });

    it('displays a "Gates and pathways" option', () => {
      cy.contains('Gates and pathways')
    });

    it('displays a "Garage, including roof and door" option', () => {
      cy.contains('Garage, including roof and door');
    });
  });
});

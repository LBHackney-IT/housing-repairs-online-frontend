import { navigateToLocation } from '../../support/helpers'

const testWindowOption = () => {
  it('displays the repair issue question', () => {
    cy.contains('What best describes the repair?')
  })

  it('displays a "Smashed window(s)" option', () => {
    cy.contains('Smashed window(s)')
  })

  it('displays a "Window stuck open" option', () => {
    cy.contains('Window stuck open')
  })

  it('displays a "Window stuck shut" option', () => {
    cy.contains('Window stuck shut')
  })

  it('displays a "Condensation" option', () => {
    cy.contains('Condensation')
  })
}

const testWallOption = () => {
  it('displays the repair issue question', () => {
    cy.contains('What best describes the repair?')
  })

  it('displays a "Wall tiles" option', () => {
    cy.contains('Wall tiles')
  })

  it('displays a "Floor tiles" option', () => {
    cy.contains('Floor tiles')
  })

  it('displays a "Light fitting(s)" option', () => {
    cy.contains('Light fitting(s)')
  })

  it('displays a "Skirting boards or architraves" option', () => {
    cy.contains('Skirting boards or architraves')
  })

  it('displays a "Plastering on the ceiling" option', () => {
    cy.contains('Plastering on the ceiling')
  })

  it('displays a "Plastering on the walls" option', () => {
    cy.contains('Plastering on the walls')
  })

  it('displays a "Wooden floorboards" option', () => {
    cy.contains('Wooden floorboards')
  })
}

const electricsOption = () => {
  before(() => {
    cy.contains('Electrics, including lights and switches').click()
    cy.get('button').click()
  })

  it('displays the repair issue question', () => {
    cy.contains('What best describes the repair?')
  })

  it('displays a "Light" option', () => {
    cy.contains('Lights')
  })

  it('displays a "Socket" option', () => {
    cy.contains('Sockets')
  })
}

const testSinkOptions = () => {
  it('displays the repair issue question', () => {
    cy.contains('What best describes the repair?')
  })

  it('displays a "Tap(s)" option', () => {
    cy.contains('Tap(s)')
  })

  it('displays a "Pipework leak" option', () => {
    cy.contains('Pipework leak')
  })

  it('displays a "Leak or blockage" option', () => {
    cy.contains('Leak or blockage')
  })

  it('displays a "Damage to the sink" option', () => {
    cy.contains('Damage to the sink')
  })
}

const testDoorOption = (testLockOnDoor = true) => {
  it('displays the repair issue question', () => {
    cy.contains('What best describes the repair?')
  })

  it('displays a "Internal door issue, including hinges, handle, sticking" option', () => {
    cy.contains('Internal door issue, including hinges, handle, sticking')
  })

  if (testLockOnDoor) {
    it('displays a "Lock on the door" option', () => {
      cy.contains('Lock on the door')
    })
  }

  it('displays a "Adjusting a door after a carpet fitting" option', () => {
    cy.contains('Adjusting a door after a carpet fitting')
  })
}

const testDampOrMouldOption = () => {
  it('displays the repair issue question', () => {
    cy.contains('What best describes the repair?')
  })

  it('displays a "Damp or mould caused by a leak" option', () => {
    cy.contains('Damp or mould caused by a leak')
  })

  it('displays a "Damp or mould caused by something else" option', () => {
    cy.contains('Damp or mould caused by something else')
  })
}

describe('repairProblemBestDescription', () => {
  context('Kitchen', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Kitchen').click()
      cy.get('button').click()
    })

    context('Cupboards, including damaged cupboard doors', () => {
      before(() => {
        cy.contains('Cupboards, including damaged cupboard doors').click()
        cy.get('button').click()
      })

      it('displays the repair issue question', () => {
        cy.contains('What best describes the repair?')
      })

      it('displays a "Hanging door" option', () => {
        cy.contains('Hanging door')
      })

      it('displays a "Missing door" option', () => {
        cy.contains('Missing door')
      })
    })

    context('Heating or hot water', () => {
      before(() => {
        navigateToLocation()
        cy.contains('Kitchen').click()
        cy.get('button').click()
        cy.contains('Heating or hot water').click()
        cy.get('button').click()
      })

      it('should redirect them to not eligible non-emergency page', () => {
        cy.url().should('include', '/report-repair/unable-to-book')
      })
    })

    context('Electrical, including extractor fans and lightbulbs', () => {
      before(() => {
        navigateToLocation()
        cy.contains('Kitchen').click()
        cy.get('button').click()
        cy.contains(
          'Electrical, including extractor fans and lightbulbs'
        ).click()
        cy.get('button').click()
      })

      it('displays a "Extractor fan" option', () => {
        cy.contains('Extractor fan')
      })

      it('displays a "Socket(s)" option', () => {
        cy.contains('Socket(s)')
      })

      it('displays a "Light fitting(s)" option', () => {
        cy.contains('Light fitting(s)')
      })

      it('displays a "Cooker switch" option', () => {
        cy.contains('Cooker switch')
      })
    })

    context('Damaged or stuck doors', () => {
      before(() => {
        navigateToLocation()
        cy.contains('Kitchen').click()
        cy.get('button').click()
        cy.contains('Damaged or stuck doors').click()
        cy.get('button').click()
      })

      it('displays a "Wooden back door" option', () => {
        cy.contains('Wooden back door')
      })

      it('displays a "UPVC back door" option', () => {
        cy.contains('UPVC back door')
      })

      it('displays a "French doors" option', () => {
        cy.contains('French doors')
      })

      it('displays a "Internal door issue, including hinges, handle, sticking" option', () => {
        cy.contains('Internal door issue, including hinges, handle, sticking')
      })

      it('displays a "Sliding door" option', () => {
        cy.contains('Sliding door')
      })
    })

    context('Walls, floor or ceiling, excluding damp', () => {
      before(() => {
        navigateToLocation()
        cy.contains('Kitchen').click()
        cy.get('button').click()
        cy.contains('Walls, floor or ceiling, excluding damp').click()
        cy.get('button').click()
      })

      testWallOption()
    })
    context('Damaged or stuck windows', () => {
      before(() => {
        cy.go(-1)
        cy.contains('Damaged or stuck windows').click()
        cy.get('button').click()
      })
      testWindowOption()
    })

    context('Sink, including taps and drainage', () => {
      before(() => {
        navigateToLocation()
        cy.contains('Kitchen').click()
        cy.get('button').click()
        cy.contains('Sink, including taps and drainage').click()
        cy.get('button').click()
      })

      testSinkOptions()
    })

    context('Damp or mould', () => {
      before(() => {
        navigateToLocation()
        cy.contains('Kitchen').click()
        cy.get('button').click()
        cy.contains('Damp or mould').click()
        cy.get('button').click()
      })
      testDampOrMouldOption()
    })
  })

  context('Bathroom', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Bathroom').click()
      cy.get('button').click()
    })

    context('Bath, including taps', () => {
      before(() => {
        cy.contains('Bath, including taps').click()
        cy.get('button').click()
      })

      it('displays the repair issue question', () => {
        cy.contains('What best describes the repair?')
      })

      it('displays a "Bath taps" option', () => {
        cy.contains('Bath taps')
      })

      it('displays a "Seal around bath" option', () => {
        cy.contains('Seal around bath')
      })

      it('displays a "Bath panel" option', () => {
        cy.contains('Bath panel')
      })

      it('displays a "Blockage" option', () => {
        cy.contains('Blockage')
      })
    })

    context('Walls, floor or ceiling, excluding damp', () => {
      before(() => {
        navigateToLocation()
        cy.contains('Bathroom').click()
        cy.get('button').click()
        cy.contains('Walls, floor or ceiling, excluding damp').click()
        cy.get('button').click()
      })

      testWallOption()
    })

    context('Sink, including taps and drainage', () => {
      before(() => {
        navigateToLocation()
        cy.contains('Bathroom').click()
        cy.get('button').click()
        cy.contains('Sink, including taps and drainage').click()
        cy.get('button').click()
      })

      testSinkOptions()
    })

    context('Electrics, including extractor fan and pull cords', () => {
      before(() => {
        navigateToLocation()
        cy.contains('Bathroom').click()
        cy.get('button').click()
        cy.contains('Electrics, including extractor fan and pull cords').click()
        cy.get('button').click()
      })

      it('displays a "Spot lights" option', () => {
        cy.contains('Spot lights')
      })

      it('displays a "Tube light" option', () => {
        cy.contains('Tube light')
      })
    })

    context('Damp or mould', () => {
      beforeEach(() => {
        navigateToLocation()
        cy.contains('Bathroom').click()
        cy.get('button').click()
        cy.contains('Damp or mould').click()
        cy.get('button').click()
      })

      it('displays a "Damp or mould caused by a leak" option', () => {
        cy.contains('Damp or mould caused by a leak').click()
        cy.get('button').click()
        cy.url().should('include', '/report-repair/emergency-repair')
      })

      it('displays a "Damp or mould caused by something else" option', () => {
        cy.contains('Damp or mould caused by something else').click()
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-description')
      })
    })

    context('Damaged or stuck doors', () => {
      before(() => {
        navigateToLocation()
        cy.contains('Bathroom').click()
        cy.get('button').click()
        cy.contains('Damaged or stuck doors').click()
        cy.get('button').click()
      })
      testDoorOption()
    })
  })

  context('Toilet', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Bathroom').click()
      cy.get('button').click()
      cy.contains('Toilet').click()
      cy.get('button').click()
    })

    it('displays the repair issue question', () => {
      cy.contains('What best describes the repair?')
    })

    it('displays a "Not flushing" option', () => {
      cy.contains('Not flushing')
    })

    it('displays a "Overflowing" option', () => {
      cy.contains('Overflowing')
    })

    it('displays a "Coming loose from the floor or wall" option', () => {
      cy.contains('Coming loose from the floor or wall')
    })

    it('displays a "Cracked" option', () => {
      cy.contains('Cracked')
    })

    it('displays a "Toilet seat" option', () => {
      cy.contains('Toilet seat')
    })
  })

  context('Shower, including the tray and shower door', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Bathroom').click()
      cy.get('button').click()
      cy.contains('Shower, including the tray and shower door').click()
      cy.get('button').click()
    })

    it('displays the repair issue question', () => {
      cy.contains('What best describes the repair?')
    })

    it('displays a "Electric shower unit" option', () => {
      cy.contains('Electric shower unit')
    })

    it('displays a "Tap shower" option', () => {
      cy.contains('Tap shower')
    })

    it('displays a "Shower hose" option', () => {
      cy.contains('Shower hose')
    })

    it('displays a "Shower head" option', () => {
      cy.contains('Shower head')
    })

    it('displays a "Shower tray broken" option', () => {
      cy.contains('Shower tray broken')
    })

    it('displays a "Cubicle door broken" option', () => {
      cy.contains('Cubicle door broken')
    })

    it('displays a "Shower drain blocked" option', () => {
      cy.contains('Shower drain blocked')
    })
  })
})

context('Bedroom', () => {
  before(() => {
    navigateToLocation()
    cy.contains('Bedroom').click()
    cy.get('button').click()
  })

  context('Walls, floor or ceiling, excluding damp', () => {
    before(() => {
      cy.contains('Walls, floor or ceiling, excluding damp').click()
      cy.get('button').click()
    })

    testWallOption()
  })

  context('Electrics, including extractor fan and pull cords', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Bedroom').click()
      cy.get('button').click()
    })

    electricsOption()
  })

  context('Electrical, including extractor fans and lightbulbs', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Bedroom').click()
      cy.get('button').click()
    })
    electricsOption()
  })

  context('Damaged or stuck windows', () => {
    before(() => {
      cy.go(-1)
      cy.contains('Damaged or stuck windows').click()
      cy.get('button').click()
    })
    testWindowOption()
  })

  context('Damaged or stuck doors', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Bedroom').click()
      cy.get('button').click()
      cy.contains('Damaged or stuck doors').click()
      cy.get('button').click()
    })
    testDoorOption(false)
  })

  context('Damp or mould', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Bedroom').click()
      cy.get('button').click()
      cy.contains('Damp or mould').click()
      cy.get('button').click()
    })
    testDampOrMouldOption()
  })
})

context('Living Area', () => {
  before(() => {
    navigateToLocation()
    cy.contains('Living Area').click()
    cy.get('button').click()
  })

  context('Walls, floor or ceiling, excluding damp', () => {
    before(() => {
      cy.contains('Walls, floor or ceiling, excluding damp').click()
      cy.get('button').click()
    })

    testWallOption()
  })
  context('Electrics, including lights and switches', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Living Areas').click()
      cy.get('button').click()
    })

    electricsOption()
  })

  context('Damaged or stuck windows', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Living Areas').click()
      cy.get('button').click()
      cy.contains('Damaged or stuck windows').click()
      cy.get('button').click()
    })
    testWindowOption()
  })

  context('Damaged or stuck doors', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Living Area').click()
      cy.get('button').click()
      cy.contains('Damaged or stuck doors').click()
      cy.get('button').click()
    })
    testDoorOption()
  })

  context('Damp or mould', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Living Area').click()
      cy.get('button').click()
      cy.contains('Damp or mould').click()
      cy.get('button').click()
    })
    testDampOrMouldOption()
  })

  context('Stairs (including handrail)', () => {
    before(() => {
      navigateToLocation()
      cy.contains('Living Area').click()
      cy.get('button').click()
      cy.contains('Stairs (including handrail)').click()
      cy.get('button').click()
    })

    it('displays the repair issue question', () => {
      cy.contains('What best describes the repair?')
    })

    it('displays a "Damaged stairs" option', () => {
      cy.contains('Damaged stairs')
    })

    it('displays a "Damaged palistrades" option', () => {
      cy.contains('Damaged palistrades')
    })

    it('displays a "Handrail" option', () => {
      cy.contains('Handrail')
    })

    it('displays a "Stair rail come loose" option', () => {
      cy.contains('Stair rail come loose')
    })
  })
})

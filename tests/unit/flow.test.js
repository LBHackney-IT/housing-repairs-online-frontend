import Flow from '../../flow'

describe('Flow', () => {
  let setStateSpy;
  let historySpy;
  let pathDummy;
  let flow;
  let prevStepsDummy = [];
  let setPrevStepsSpy;

  beforeEach(() => {
    setStateSpy = jest.fn();
    historySpy = {
      push: jest.fn()
    };
    setPrevStepsSpy = jest.fn();

    pathDummy = 'report-repair';

    flow = new Flow(setStateSpy, historySpy, pathDummy, prevStepsDummy, setPrevStepsSpy);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('nextStep', () =>{
    test('sets next step when there is no current step or previous step', () => {
      const step = 'somewhere';
      flow.nextStep(step, {prevStep: '', step: ''})
      expect(setStateSpy).toHaveBeenCalledWith({
        prevStep: '',
        step: step
      });

      expect(setPrevStepsSpy).toHaveBeenCalledWith(['']);

      expect(historySpy.push).toHaveBeenCalledWith(`${step}`);
    });

    test('overrides step when there is a current step and previous step', () => {
      const step = 'Three';
      flow.nextStep(step, {prevStep: 'One', step: 'Two'})
      expect(setStateSpy).toHaveBeenCalledWith({
        prevStep: 'Two',
        step: step
      });
      expect(setPrevStepsSpy).toHaveBeenCalledWith(['Two']);
      expect(historySpy.push).toHaveBeenCalledWith(`${step}`);
    });
  });

  describe('_stepIsInFlow', ()=>{
    test('returns true if previous step is in flow', ()=>{
      const state = {
        prevStep: '',
        step: 'address'
      }
      let result = flow._stepIsInFlow(state)
      expect(result).toBeTruthy()
    })

    test('returns false if previous step is in flow', ()=>{
      const state = {
        prevStep: '',
        step: 'something'
      }
      let result = flow._stepIsInFlow(state)
      expect(result).toBeFalsy()
    })
  })

  describe('prevStep', ()=>{
    beforeAll(()=> {
      prevStepsDummy = ['postcode'];

      flow = new Flow(setStateSpy, historySpy, pathDummy, prevStepsDummy, setPrevStepsSpy);
    })
    test('changes step to previous step', ()=>{
      const state = {
        prevStep: 'postcode',
        step: 'address'
      }
      flow.prevStep(state);

      expect(setPrevStepsSpy).toHaveBeenCalledWith([]);

      expect(setStateSpy).toHaveBeenCalledWith({'prevStep': 'postcode', 'step': 'postcode'});

      expect(historySpy.push).toHaveBeenCalledWith('postcode');
    });

    describe('when step and previous step are equal', ()=> {
      beforeAll(()=> {
        prevStepsDummy = ['address'];

        flow = new Flow(setStateSpy, historySpy, pathDummy, prevStepsDummy, setPrevStepsSpy);
      })
      test('find\'s previous step from flow', () => {
        const state = {
          prevStep: 'address',
          step: 'address'
        }
        flow.prevStep(state);
        expect(setStateSpy).toHaveBeenCalledWith(state);
        expect(historySpy.push).toHaveBeenCalledWith('address');
      });
    });

    describe('previous step is undefined and step is not in flow', ()=>{
      test('redirects to home', ()=>{
        const state = {
          prevStep: undefined,
          step: 'something'
        }
        flow.prevStep(state);
        expect(setStateSpy).not.toBeCalled();
        expect(historySpy.push).toHaveBeenCalledWith('/');
      });
    })

    describe('multiple previous step', ()=>{
      beforeEach(()=> {
        prevStepsDummy = ['kitchen', 'repair-kitchen-cupboard-problems'];

        flow = new Flow(setStateSpy, historySpy, pathDummy, prevStepsDummy, setPrevStepsSpy);
      })
      test('redirects repair-kitchen-cupboard-problems when repairProblemBestDescription value is doorMissing', ()=>{
        const state = {
          prevStep: 'repair-description',
          step: 'repair-description',
          data: {
            repairProblemBestDescription: {
              value: 'doorMissing'
            }
          }
        }
        flow.prevStep(state);
        expect(setStateSpy).toBeCalled();
        expect(historySpy.push).toHaveBeenCalledWith('repair-kitchen-cupboard-problems');
      });
      test('redirects repair-kitchen-cupboard-problems when repairProblemBestDescription value is doorHangingOff', ()=>{
        const state = {
          prevStep: 'repair-description',
          step: 'repair-description',
          data: {
            repairProblemBestDescription: {
              value: 'doorHangingOff'
            }
          }
        }
        flow.prevStep(state);
        expect(setStateSpy).toBeCalled();
        expect(historySpy.push).toHaveBeenCalledWith('repair-kitchen-cupboard-problems');
      });
    })
  });

  describe('handleChange', ()=> {
    describe('when next step is conditional', ()=>{
      describe('when condition exists', ()=>{
        test('next step and data are set appropriately', ()=>{
          flow.handleChange('field', 'emergency/2', {step: 'priority-list', data: {}});
          expect(setStateSpy).toHaveBeenCalledWith({
            prevStep: 'priority-list',
            step: 'emergency-repair',
            data: {
              'field': 'emergency/2'
            }
          });
          expect(historySpy.push).toHaveBeenCalledWith('emergency-repair');
        });
      });

      describe('when condition doesn\'t exist', ()=>{
        test('current step is reset and data is set', ()=>{
          flow.handleChange('field', 'bunnies', {step: 'priority-list', data: {}});
          expect(setStateSpy).toHaveBeenCalledWith({
            prevStep: 'priority-list',
            step: 'priority-list',
            data: {
              'field': 'bunnies'
            }
          });
          expect(historySpy.push).toHaveBeenCalledWith('priority-list');
        });
      })
    });

    describe('when next step is unconditional', ()=>{
      test('next step and data are set appropriately', ()=>{
        flow.handleChange('field', 'M3 0W', {step: 'postcode', data: {}});
        expect(setStateSpy).toHaveBeenCalledWith({
          prevStep: 'postcode',
          step: 'address',
          data: {
            'field': 'M3 0W'
          }
        });
        expect(historySpy.push).toHaveBeenCalledWith('address');
      });
    });

    describe('when current step doesn\'t have a next step', ()=>{
      test('next step and data are set appropriately', ()=>{
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
          value: {
            pathname: '/report-repair/priority-list'
          }
        });

        flow.handleChange('field', 'value', {step: 'emergency', data: {}});
        expect(setStateSpy).toHaveBeenCalledWith({
          prevStep: 'priority-list',
          step: 'communal',
          data: {
            'field': 'value'
          }
        });
        expect(historySpy.push).toHaveBeenCalledWith('communal');
      });
    })

    describe('can generate next step from condition', ()=>{
      test('walls/floors/ceiling', ()=>{
        let result = flow.getNextStepFromCondition('wallsFloorsCeiling');
        expect(result).toBe('wall-floor-ceiling-problems');
      });
      test('kitchen', ()=>{
        let result = flow.getNextStepFromCondition('kitchen');
        expect(result).toBe('repair-kitchen-problems');
      });
    });

    describe('when a repairProblemBestDescription is selected', () => {
      describe('when the repairProblemBestDescription is updated', () => {
        test('then a repairProblemBestDescription is deselected and a repairProblemBestDescription does not exists', () =>{
          const state = {
            step: 'kitchen-door-problems',
            data: {
              'repairProblem': {value: 'heatingOrHotWater', display: 'Heating or hot water'},
              'repairProblemBestDescription': {value: 'smashed', display: 'Smashed window(s)'}
            },
            prevStep: 'repair-kitchen-problems',
          }
          flow.handleChange('repairProblemBestDescription', {value: 'internalDoorIssue', display: 'Internal door issue, including hinges, handle, sticking'}, state);
          expect(setStateSpy).toHaveBeenCalledWith({
            step: 'kitchen-door-problems',
            data: {
              'repairProblem': {value: 'heatingOrHotWater', display: 'Heating or hot water'},
              'repairProblemBestDescription': {value: 'internalDoorIssue', display: 'Internal door issue, including hinges, handle, sticking'}
            },
            prevStep: 'kitchen-door-problems'})
        })
      })
      test('then a repairProblemBestDescription is deselected and a repairProblemBestDescription does not exists', () =>{
        const state = {
          step: 'repair-kitchen-problems',
          data: {
            'repairProblem': 'windows',
            'repairProblemBestDescription': 'stuckOpen'
          },
          prevStep: 'repair-kitchen-problems',
        }
        flow.handleChange('repairProblem', {display: 'Damaged worktop', value: 'worktop'}, state);
        expect(setStateSpy).toHaveBeenCalledWith({
          step: 'repair-description',
          data: {
            'repairProblem': {display: 'Damaged worktop', value: 'worktop'}
          },
          prevStep: 'repair-kitchen-problems'})
      })
    })
  });
})

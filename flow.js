
class Flow {
  constructor(setState, history, path, prevSteps, setPrevSteps) {
    this.setState = setState;
    this.history = history;
    this.path = path;
    this.prevSteps = prevSteps;
    this.setPrevSteps = setPrevSteps;
    this.flow = {
      'priority-list': {prevStep: false, nextStep: [
        {condition: 'gas-emergency/1', nextStep: 'smell-gas'},
        {condition: 'emergency/2', nextStep: 'emergency-repair'},
        {condition: 'emergency/3', nextStep: 'emergency-repair'},
        {condition: 'emergency/4', nextStep: 'emergency-repair'},
        {condition: 'emergency/5', nextStep: 'emergency-repair'},
        {condition: 'emergency/6', nextStep: 'emergency-repair'},
        {condition: 'emergency/7', nextStep: 'emergency-repair'},
        {condition: 'emergency/8', nextStep: 'emergency-repair'},
        {condition: 'non-emergency/9', nextStep: 'communal'}
      ]},
      'communal': {prevStep: 'priority-list', nextStep: [
        {condition: 'yes', nextStep: 'not-eligible-communal-repairs'},
        {condition: 'no', nextStep: 'postcode'}
      ]},
      'postcode': {prevStep: 'communal', nextStep: 'address'},
      'address': {prevStep: 'postcode', nextStep: 'repair-location'},
      'repair-location': { prevStep: 'address', nextStep: [
        {condition: 'kitchen', nextStep: 'repair-kitchen-problems'},
        {condition: 'bathroom', nextStep: 'repair-bathroom-problems'},
        {condition: 'bedroom', nextStep: 'repair-bedroom-problems'},
        {condition: 'livingAreas', nextStep: 'repair-living-areas-problems'},
      ]},
      'repair-outside-problems': { prevSteps: 'repair-location', nextStep: [
        {condition: 'securityLights', nextStep: 'repair-description'},
        {condition: 'roof', nextStep: 'outside-roof-problems'},
        {condition: 'garage', nextStep: 'repair-garage-problems'},
        {condition: 'door', nextStep: 'outside-door-problems'},
        {condition: 'gatesAndPathways', nextStep: 'gates-and-pathways-problems'}
      ]},
      'repair-garage-problems': { prevSteps:'', nextStep: 'repair-description'},
      'gates-and-pathways-problems': { prevSteps:'repair-outside-problems', nextStep: 'repair-description'},
      'outside-roof-problems':  { prevSteps: 'repair-outside-problems', nextStep: 'repair-description'},
      'outside-door-problems':  { prevSteps: 'repair-outside-problems', nextStep: 'repair-description'},
      'repair-kitchen-problems': { prevStep: 'repair-location', nextStep: [
        {condition: 'cupboards', nextStep: 'repair-kitchen-cupboard-problems'},
        {condition: 'windows', nextStep: 'repair-window-problems'},
        {condition: 'dampOrMould', nextStep: 'damp-mould-problems'},
        {condition: 'electrical', nextStep: 'kitchen-electrical-problems'},
        {condition: 'worktop', nextStep: 'repair-description'},
        {condition: 'sink', nextStep: 'sink-problems'},
        {condition: 'heatingOrHotWater', nextStep: 'unable-to-book'},
        {condition: 'drip-or-leak', nextStep: 'repair-description-leak'},
        {condition: 'door', nextStep: 'kitchen-door-problems'},
        {condition: 'wallsFloorsCeiling', nextStep: 'wall-floor-ceiling-problems'}
      ]},
      'repair-door-problems': { prevSteps: '', nextStep: [
        {condition: 'internalDoorIssue', nextStep: 'repair-description'},
        {condition: 'lockOnDoor', nextStep: 'repair-description'},
        {condition: 'adjustingDoorAfterCarpetFitting', nextStep: 'not-eligible-non-emergency'}]},
      'repair-toilet-problems': { prevSteps: '', nextStep: [
        {condition: 'notFlushing', nextStep: 'repair-description'},
        {condition: 'overflowing', nextStep: 'repair-description'},
        {condition: 'looseFromFloorOrWall', nextStep: 'repair-description'},
        {condition: 'cracked', nextStep: 'repair-description'},
        {condition: 'seat', nextStep: 'not-eligible-non-emergency'}]},
      'damp-mould-problems':  { prevSteps: '', nextStep: [
        {condition: 'dampMouldCausedByLeak', nextStep: 'emergency-repair'},
        {condition: 'dampOrMould', nextStep: 'repair-description'}]},
      'repair-shower-problems': { prevSteps: '', nextStep: [
        {condition: 'electricShowerUnit', nextStep: 'repair-description'},
        {condition: 'showerTap', nextStep: 'repair-description'},
        {condition: 'showerHose', nextStep: 'repair-description'},
        {condition: 'showerHead', nextStep: 'repair-description'},
        {condition: 'showerTrayBroken', nextStep: 'repair-description'},
        {condition: 'cubicleDoorBroken', nextStep: 'repair-description'},
        {condition: 'showerDrainBlocked', nextStep: 'emergency-repair'},]},
      'sink-problems': {nextStep: 'repair-description'},
      'kitchen-door-problems': { prevStep: 'repair-kitchen-problems', nextStep: 'repair-description'},
      'kitchen-electrical-problems': {prevStep: 'repair-kitchen-problems', nextStep: 'repair-description'},
      'repair-bathroom-problems': { prevStep: 'repair-location', nextStep: [
        {condition: 'wallsFloorsCeiling', nextStep: 'wall-floor-ceiling-problems'},
        {condition: 'bath', nextStep: 'bath-problems'},
        {condition: 'electricsExtractorCords', nextStep: 'repair-bathroom-electric-problems'},
        {condition: 'sink', nextStep: 'sink-problems'},
        {condition: 'windows', nextStep: 'repair-window-problems'},
        {condition: 'dampOrMould', nextStep: 'bathroom-damp-mould-problems'},
        {condition: 'damagedOrStuckDoors', nextStep: 'repair-door-problems'},
        {condition: 'showerIncludingTrayAndDoor', nextStep: 'repair-shower-problems'},
        {condition: 'damagedOrStuckDoors', nextStep: 'repair-door-problems'},
        {condition: 'toilet', nextStep: 'repair-toilet-problems'},
        {condition: 'heatingOrHotWater', nextStep: 'unable-to-book'}
      ]},
      'repair-bedroom-problems': { prevStep: 'repair-location', nextStep: [
        {condition: 'electricsLightsSwitches', nextStep: 'repair-bedroom-lighting-problems'},
        {condition: 'wallsFloorsCeiling', nextStep: 'wall-floor-ceiling-problems'},
        {condition: 'windows', nextStep: 'repair-window-problems'},
        {condition: 'damagedOrStuckDoors', nextStep: 'repair-bedroom-door-problems'},
        {condition: 'dampOrMould', nextStep: 'damp-mould-problems'},
        {condition: 'heating', nextStep: 'unable-to-book'},
      ]},
      'repair-living-areas-problems': {prevSteps: 'repair-location', nextStep: [
        {condition: 'electricsLightsSwitches', nextStep: 'repair-bedroom-lighting-problems'},
        {condition: 'wallsFloorsCeiling', nextStep: 'wall-floor-ceiling-problems'},
        {condition: 'windows', nextStep: 'repair-window-problems'},
        {condition: 'damagedOrStuckDoors', nextStep: 'repair-living-area-door-problems'},
        {condition: 'dampOrMould', nextStep: 'damp-mould-problems'},
        {condition: 'stairs', nextStep: 'repair-stairs-problems'},
        {condition: 'heating', nextStep: 'unable-to-book'},
      ]},
      'repair-bathroom-electric-problems': { prevStep: 'repair-bathroom-problems', nextStep: 'repair-description'},
      'repair-stairs-problems': { prevStep: 'repair-living-areas-problems', nextStep: 'repair-description'},
      'repair-living-area-door-problems': { prevSteps: '', nextStep: [
        {condition: 'internalDoorIssue', nextStep: 'repair-description'},
        {condition: 'lockOnDoor', nextStep: 'not-eligible-non-emergency'},
        {condition: 'adjustingDoorAfterCarpetFitting', nextStep: 'not-eligible-non-emergency'}
      ]},
      'repair-bedroom-door-problems': { prevSteps: 'repair-location', nextStep: [
        {condition: 'internalDoorIssue', nextStep: 'repair-description'},
        {condition: 'adjustingDoorAfterCarpetFitting', nextStep: 'not-eligible-non-emergency'}
      ]},
      'bath-problems': { prevStep: 'repair-bathroom-problems', nextStep: 'repair-description'},
      'repair-window-problems': {nextStep: 'repair-description'},
      'repair-bedroom-lighting-problems': { prevStep: 'repair-bedroom-problems', nextStep: 'repair-description'},
      'repair-living-areas-lighting-problems': { prevStep: 'repair-living-areas-problems', nextStep: 'repair-description'},
      'wall-floor-ceiling-problems': {nextStep: 'repair-description'},
      'repair-kitchen-cupboard-problems': {prevStep: 'repair-kitchen-problems', nextStep: 'repair-description'},
      'bathroom-damp-mould-problems': { prevStep: 'repair-bathroom-problems',
        nextStep: [
          {condition: 'emergency', nextStep: 'emergency-repair'},
          {condition: 'dampOrMould', nextStep: 'repair-description'}
        ]
      },
      'repair-description-damp': {prevStep: 'repair-kitchen-types', nextStep: [
        {condition: 'damp', nextStep: 'repair-damp'},
        {condition: 'mould', nextStep: 'repair-description-damp-mold'},
        {condition: 'both', nextStep: 'repair-description'},
        {condition: 'not-sure', nextStep: 'repair-description'},
      ]},
      'repair-damp': { prevStep: 'repair-description-damp', nextStep: 'repair-description-damp-pipes'},
      'repair-description-damp-pipes': {prevStep: 'repair-damp', nextStep:'repair-description' },
      'repair-description-damp-mold': {prevStep:'repair-description-damp', nextStep: 'repair-description' },
      'repair-description-electrical': { prevStep: 'repair-kitchen-types', nextStep: [
        {condition: 'extractor-fan', nextStep: 'repair-description'},
        {condition: 'light-fitting', nextStep: 'repair-description'},
        {condition: 'light-switch', nextStep: 'repair-description'},
        {condition: 'smoke-detector-beeping', nextStep: 'repair-description-electrical-smoke-alarm'},
        {condition: 'sockets', nextStep: 'repair-description'},
        {condition: 'carbon-monoxide-alarm', nextStep: 'repair-description-electrical-carbon-monoxide-alarm'},
        {condition: 'something-else', nextStep: 'repair-description'}
      ]},
      'repair-description-electrical-smoke-alarm': {prevStep: 'repair-description-electrical'},
      'repair-description-electrical-carbon-monoxide-alarm': {prevStep: 'repair-description-electrical'},
      'repair-description-heating-water': {prevStep: 'repair-kitchen-types', nextStep: [
        {condition: 'no-heating-or-hot-water', nextStep: 'repair-description-heating-water-emergency'},
        {condition: 'radiator-not-working', nextStep: 'repair-description'},
        {condition: 'radiator-coming-loose', nextStep: 'repair-description'},
        {condition: 'radiator-leaking', nextStep: 'repair-description'},
        {condition: 'something-else', nextStep: 'repair-description'},
      ]},
      'repair-description-leak': { prevStep: 'repair-kitchen-types', nextStep: [
        {condition: 'dripping-from-wall-or-ceiling', nextStep: 'repair-description-leak-electrics'},
        {condition: 'containable-sink-leak', nextStep: 'repair-description'},
        {condition: 'tap-dripping-water', nextStep: 'repair-description'},
        {condition: 'running-tap', nextStep: 'emergency-repair'},
        {condition: 'non-containable-radiator-leak', nextStep: 'repair-description'},
        {condition: 'something-else', nextStep: 'repair-description'},
      ]},
      'repair-description-leak-electrics': {prevStep: 'repair-description-leak', nextStep: [
        {condition: 'dripping-on-to-electrics', nextStep: 'repair-leak-description-electrics-emergency'},
        {condition: 'containable-with-bucket', nextStep: 'repair-description-leak-inside'},
        {condition: 'not-containable', nextStep: 'repair-leak-description-electrics-emergency'}
      ]},
      'repair-description-leak-inside': {prevStep: 'repair-description-leak-electrics', nextStep: 'repair-description-leak-source'},
      'repair-description-leak-source': {prevStep: 'repair-description-leak-inside', nextStep: 'repair-description'},
      'repair-leak-description-electrics-emergency': {prevStep: 'repair-description-leak-electrics'},
      'repair-description': {prevStep: true, nextStep: 'contact-person'},
      'contact-person': {prevStep: 'repair-description', nextStep:'contact-details'},
      'contact-details': {prevStep: 'contact-person', nextStep: 'repair-availability'},
      'repair-availability': {prevStep: 'contact-details', nextStep: 'summary'},
      'summary': {prevStep: 'repair-availability', nextStep: ''},//need to investigate this as there are numerous prev steps, but it might just work

      // 'contact-details-appointment': { prevStep: 'repair-availability', nextStep: 'appointment-playback'},
      // 'appointment-playback': {prevStep: 'contact-details-appointment', nextStep: [
      //   {condition: 'change-appointment', nextStep:'repair-availability'},
      //   {condition: 'keep-appointment', nextStep: 'contact-details'}
      // ]},
      // 'summary': {prevStep: 'appointment-playback', nextStep: [
      //   {condition: 'change-repair-address', nextStep: 'postcode'},
      //   {condition: 'change-contact-details', nextStep: 'contact-details'},
      //   {condition: 'change-phone-number', nextStep: 'contact-details-appointment'},
      //   {condition: 'change-location', nextStep: 'repair-location'},
      //   {condition: 'change-issue', nextStep: 'repair-kitchen-types'},
      //   {condition: 'change-description', nextStep: 'repair-description'},
      //   {condition: 'change-appointment-date', nextStep: 'repair-availability'},
      //   {condition: 'change-appointment-information', nextStep: 'personal-details'},
      //   {condition: 'confirm-and-report', nextStep: 'confirmation'}
      // ]},
    }
  };
  nextStep (step, state, prevStep) {
    state.prevStep = prevStep ? prevStep : state.step
    this.setPrevSteps([...this.prevSteps, state.prevStep])
    state.step = step;
    this.setState(state);

    this.history.push(step)
  };

  _stepIsInFlow = (state) => (this.flow[state.step])

  getNextStepFromCondition = (condition) => {
    for (const [_, value] of Object.entries(this.flow)) {
      let steps = value.nextStep
      if (Array.isArray(steps)) {
        const step = steps.filter(step => step.condition == condition)
        if (step.length > 0) {
          return step[0].nextStep
        }
      }
    }
  }

  prevStep = (state) => {
    const step = this.prevSteps.pop();
    state.prevStep = step;
    state.step = step;
    this.setPrevSteps(this.prevSteps);

    if (this._stepIsInFlow(state)) {
      this.setState(state);
      this.history.push(state.prevStep)
    } else {
      return this.history.push('/')
    }
  }
  handleChange = (input, value, state) => {
    let repairProblemChanged = input == 'repairProblem' && state.data[input] != value;
    state.data[input]= value
    let nextFlowStep =  this.flow[state.step]?.nextStep
    if (nextFlowStep) {
      if (Array.isArray(nextFlowStep)) {
        let condition
        if(typeof value === 'object'){
          condition = nextFlowStep.find(o => o.condition === value.value)
        }else{
          condition = nextFlowStep.find(o => o.condition === value);
        }
        nextFlowStep = condition ? condition.nextStep : state.step;
      }
      if(nextFlowStep == 'repair-description' && repairProblemChanged){
        delete state.data['repairProblemBestDescription']
      }
      return this.nextStep(nextFlowStep, state);
    }

    const { flowNextStep, flowPrevStep } = this._stepsFromUrl()
    state.prevStep = flowPrevStep;
    this.nextStep(flowNextStep, state, flowPrevStep);
  };

  _stepsFromUrl = () =>{
    const urlStep = window.location.pathname.split('/').pop()
    const flowNextStep = Object.keys(this.flow).find(key => this.flow[key].prevStep === urlStep);
    return {
      flowNextStep: flowNextStep,
      flowPrevStep: urlStep
    }
  }
}
export default Flow;

import PropTypes from 'prop-types';
import RadioFieldSet from '../radioFieldSet';
import React from 'react';


const PriorityList = ({handleChange, values}) => {
  const name =  'priority-list';
  const title =  'Please select one of the below';
  const options =  [
    { value: 'gas-emergency/1', title: 'I can smell gas in or near the property in or near the property'},
    { value: 'emergency/2', title: 'I have no heating in the property'},
    { value: 'emergency/3', title: 'I have no water in the property'},
    { value: 'emergency/4', title: 'I have no electricity in the property'},
    { value: 'emergency/5', title: 'I have a leak'},
    { value: 'emergency/6', title: 'I can\'t lock the doors or windows in my property'},
    { value: 'emergency/7', title: 'I have exposed wires or sockets'},
    { value: 'emergency/8', title: 'My carbon monoxide or smoke alarm is beeping'},
    { value: 'non-emergency/9', title: 'Something else'},
  ];

  const Continue = ({val}) => {
    const selected = val[name];
    handleChange(name, selected);
  }

  return (<div className="govuk-grid-row" data-cy="priority-list">
    <div className="govuk-grid-column-two-thirds">
      <RadioFieldSet
        name={name}
        title={title}
        options={options}
        onSubmit={Continue}
        buttonText={'Continue'}
        checked={values[name]}
        orDivider={true}
      />
    </div>
  </div>)

};

PriorityList.propTypes = {
  nextStep: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default PriorityList;

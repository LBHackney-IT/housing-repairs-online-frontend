import PropTypes from 'prop-types';
import RadioFieldSet from '../radioFieldSet';
import React from 'react';

const RepairLocation = ({handleChange, values}) => {
  const name =  'repairLocation';
  const title =  'Where is the repair?';
  const options =  [
    { value: 'kitchen', title: 'Kitchen'},
    { value: 'bedroom', title: 'Bedroom'},
    { value: 'bathroom', title: 'Bathroom'},
    { value: 'livingAreas', title: 'Living Areas'},
    { value: 'outside', title: 'Outside'},
  ];

  const Continue = ({val, display}) => {
    handleChange(name, {value: val[name], display: display});
  }

  return <div className="govuk-grid-row" data-cy="repair-location">
    <div className="govuk-grid-column-two-thirds">
      <RadioFieldSet name={name}
        title={title}
        options={options}
        onSubmit={Continue}
        checked={values[name]?.value}
        buttonText='Continue'
      />
    </div>
  </div>
};

RepairLocation.propTypes = {
  nextStep: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default RepairLocation;

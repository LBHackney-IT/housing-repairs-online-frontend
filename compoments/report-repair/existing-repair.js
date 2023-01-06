import PropTypes from 'prop-types';
import RadioFieldSet from '../radioFieldSet';
import React from 'react';

const ExistingRepair = ({ handleChange, values }) => {
  const name = 'existing-repair';
  const title =
    'Is this a new repair request or have you reported this before?';
  const options = [
    { value: 'yes', title: 'New repair' },
    { value: 'no', title: 'I have reported this repair before' },
  ];

  const Continue = ({ val }) => {
    const selected = val[name];
    handleChange(name, selected);
  };

  return (
    <div className="govuk-grid-row" data-cy="communal">
      <div className="govuk-grid-column-two-thirds">
        <RadioFieldSet
          name={name}
          title={title}
          options={options}
          onSubmit={Continue}
          buttonText={'Continue'}
          checked={values[name]}
        />
      </div>
    </div>
  );
};

ExistingRepair.propTypes = {
  nextStep: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
};

export default ExistingRepair;

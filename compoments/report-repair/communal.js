import PropTypes from 'prop-types';
import Details from '../details';
import RadioFieldSet from '../radioFieldSet';
import React from 'react';


const Communal = ({handleChange, values}) => {
  const name =  'communal';
  const title =  'Is the problem in a communal area?';
  const options =  [
    { value: 'yes', title: 'Yes'},
    { value: 'no', title: 'No'}
  ];
  const beforeButton =  (
    <Details summary="What is a communal area?" testid="communal-area-prompt">
      <span data-testid="communal-area-info">
        <p>Communal repairs are usually in areas that people share.</p>
        <p>They can include:</p>
        <ul className={'govuk-list govuk-list--bullet'}>
          <li>repairs to door entry systems</li>
          <li>lock repairs to communal doors</li>
          <li>lighting repairs to shared areas</li>
          <li>glazing repairs to shared doors or stairway windows</li>
          <li>roof and gutter repairs</li>
          <li>structure and external walls to your block</li>
        </ul>
      </span>
    </Details>
  );

  const Continue = ({val}) => {
    const selected = val[name];
    handleChange(name, selected);
  }

  return (<div className="govuk-grid-row"  data-cy="communal">
    <div className="govuk-grid-column-two-thirds">
      <RadioFieldSet name={name}
        title={title}
        options={options}
        onSubmit={Continue} buttonText={'Continue'}
        beforeButton={beforeButton}
        checked={values[name]}
      />
    </div>
  </div>)
};

Communal.propTypes = {
  nextStep: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default Communal;

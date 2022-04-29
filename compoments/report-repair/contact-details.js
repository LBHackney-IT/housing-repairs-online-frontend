import PropTypes from 'prop-types';
import React from 'react';
import {
  mobilePhoneNumberValidator,
  emailValidator,
  phoneOnKeyPress
} from '../../helpers/validators';
import RadioFieldSet from '../radioFieldSet';
import Details from '../details';
import OpeningHours from './opening-hours';
import {customerServicesTelephoneNumber} from '../../globals';

const ContactDetails = ({handleChange, values}) => {
  const name = 'contactDetails'
  const Continue = val => {
    handleChange(name, {
      type: val.selected,
      value: val.input
    });
  }

  const options =  [
    { value: 'text', title: 'Text message (recommended)', conditional: {
      label: 'Please enter a UK mobile number',
      type: 'tel', validator: mobilePhoneNumberValidator, onKeyPress: phoneOnKeyPress
    }},
    { value: 'email', title: 'Email', conditional: {
      label: 'Please enter your email address',
      type: 'email', validator: emailValidator
    }}
  ];

  const beforeButton =  (
    <Details summary="I have neither a mobile number nor an email address" testid="no-applicable-contact-options-prompt">
      <div data-testid='no-applicable-contact-options-info'>
        Please call {customerServicesTelephoneNumber} to report your repair during the office hours below
        <OpeningHours/>
      </div>
    </Details>
  );

  return <div className="govuk-grid-row" data-cy="contact-details">
    <div>
      <RadioFieldSet name={name}
        title={'How should we confirm the appointment?'}
        options={options}
        onSubmit={Continue}
        checked={values[name]?.type}
        buttonText={'Continue'}
        conditionalValue={{[values[name]?.type]: values[name]?.value}}
        beforeButton={beforeButton}
      ></RadioFieldSet>
    </div>
  </div>
};

ContactDetails.propTypes = {
  storeAddresses: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default ContactDetails;

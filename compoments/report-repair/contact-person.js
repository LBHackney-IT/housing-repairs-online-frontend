import PropTypes from 'prop-types'
import React from 'react'
import { phoneOnKeyPress, phoneValidator } from '../../helpers/validators'
import ContactDetailsInput from '../contactDetailsInput'

const ContactPerson = ({ handleChange, values }) => {
  const Continue = (val) => {
    handleChange('contactPerson', val)
  }

  return (
    <div className="govuk-grid-row" data-cy="contact-person">
      <div>
        <ContactDetailsInput
          value={values.contactPerson?.contactNumberValue}
          name={'phone-number'}
          onSubmit={Continue}
          validation={phoneValidator}
          type="tel"
          label="Please enter a UK landline or mobile phone number"
          title="Who should we contact, if we need to get in touch?"
          buttonText={'Continue'}
          long={true}
          onKeyPress={phoneOnKeyPress}
          nameName={'contact-name'}
          nameType="text"
          nameLabel="Contact  name"
          nameValue={values.contactPerson?.contactNameValue}
        ></ContactDetailsInput>
      </div>
    </div>
  )
}

ContactPerson.propTypes = {
  storeAddresses: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default ContactPerson

import React from 'react';

const NotEligibleInvalidProperty = ({property}) => {

  return (
    <div className="govuk-grid-row govuk-body-m">
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl lbh-heading-h1'>Property not eligible</h1>
        <p>
            Unfortunately it is not possible to raise a repair on Repairs Online for the property at this address: <strong>{property.address.addressLine1} - {property.address.postCode}</strong>.
        </p>
      </div>
    </div>
  );
};

export default NotEligibleInvalidProperty;

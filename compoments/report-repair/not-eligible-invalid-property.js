import React from 'react'

const NotEligibleInvalidProperty = () => {
  return (
    <div className="govuk-grid-row govuk-body-m">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-xl lbh-heading-h1">
          Property not eligible
        </h1>
        <p>
          Unfortunately it is not possible to raise a repair on Repairs Online
          for the property at this address.
        </p>
        <p>
          If you think your property is eligible, please contact please call
          customer services on <b>0208 356 3691</b>
        </p>
      </div>
    </div>
  )
}

export default NotEligibleInvalidProperty

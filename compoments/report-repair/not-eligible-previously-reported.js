import React from 'react'
import OpeningHours from './opening-hours'
import { customerServicesTelephoneNumber } from '../../globals'

const NotEligiblePreviouslyReported = () => {
  return (
    <div className="govuk-grid-row govuk-body-m">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-xl lbh-heading-h1">
          For existing repairs, please call us during the office hours below
        </h1>
        <OpeningHours />
        <p>
          If you think the council is responsible for your property, please
          call&nbsp;
          <strong>{customerServicesTelephoneNumber}</strong>.
        </p>
        <p>
          If you are a leaseholder you can still report communal repairs
          on&nbsp;
          <strong>{customerServicesTelephoneNumber}</strong>.
        </p>
      </div>
    </div>
  )
}

export default NotEligiblePreviouslyReported

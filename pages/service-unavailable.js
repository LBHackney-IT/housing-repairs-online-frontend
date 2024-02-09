import WarningText from '../compoments/warningText';
import React from 'react';

export default function ServiceUnavailable() {
  return (
    <div className="govuk-grid-row govuk-body-m govuk-!-margin-top-7 lbh-body-m">
      <div className="govuk-grid-column-two-thirds">
        <h1 className={'govuk-heading-xl lbh-heading-h1'}>
          Temporarily Unavailable
        </h1>
        <WarningText
          testid="landing-page-report-limit-warning"
          className="govuk-!-margin-top-4 lbh-body lbh-!-font-weight-bold"
        >
          We apologise for the inconvenience. Our online Housing Repairs system is currently unavailable From 9th February until Monday 12th at 9 am. Please try back later, or call the Repairs Contact Centre on 0208 356 3691 to report your repair.
        </WarningText>
      </div>
    </div>
  );
}

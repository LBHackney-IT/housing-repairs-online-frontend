import PropTypes from 'prop-types';
import React, {useState} from 'react';
import TextLink from '../textLink';


const Confirmation = ({ requestId, confirmation }) => {
  return (
    <div className="govuk-grid-row" data-cy="confirmation">
      <div className="govuk-grid-column-two-thirds">
        <div className="govuk-panel govuk-panel--confirmation">
          <h1 className="govuk-panel__title">Repair request complete</h1>
          <div className="govuk-panel__body">
            Your repair number is<br/><strong>{requestId}</strong>
          </div>
        </div>
        <p>We have sent a confirmation to {confirmation}.</p>
        <p>
          You will need to provide your repair number and
          postcode to either change or cancel your booking.
        </p>

        <h2 className="govuk-heading-m">What happens next</h2>
        <p>
          We will assess your repair and may be in touch to ask follow-up
          questions.
        </p>
        <TextLink href="/">
          Report another issue
        </TextLink>
        <div className="govuk-!-margin-bottom-9"></div>
      </div>
    </div>
  );
};
Confirmation.propTypes = {
  values: PropTypes.object,
};
export default Confirmation;

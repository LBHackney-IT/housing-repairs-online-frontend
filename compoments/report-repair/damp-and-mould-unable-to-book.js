import React from 'react';
import { customerServicesTelephoneNumber } from '../../globals';

const DampAndMouldUnableToBook = () => {
  return (
    <div className="govuk-grid-row govuk-body-m">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-xl lbh-heading-h1">
          Your repair could not be booked
        </h1>

        <p>
          Reports of damp and mould are taken very seriously by the council.
        </p>
        <p>
          Under Awaab's law, we have set timeframes for inspection which are not
          supported by this platform.
        </p>
        <p>
          Please call this into our repairs contact centre on{' '}
          <strong>{customerServicesTelephoneNumber}</strong>.
        </p>
      </div>
    </div>
  );
};

export default DampAndMouldUnableToBook;

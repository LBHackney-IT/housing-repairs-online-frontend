import React from 'react';

const EmergencyRepair = () => {
  return (
    <div className="govuk-grid-row govuk-body-m">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-xl lbh-heading-h1">
          Your repair could be an emergency
        </h1>

        <p>You cannot request emergency repairs online.</p>

        <p>
          Call <strong>020 8356 3691</strong> now. We're open 24 hours, 7 days a
          week.
        </p>

        <p>
          If you can smell gas, report it immediately to the Gas Emergency
          Service on <strong>0800 111 999</strong> or via textphone (minicom) on{' '}
          <strong>0800 371 787</strong>.
        </p>
      </div>
    </div>
  );
};

export default EmergencyRepair;

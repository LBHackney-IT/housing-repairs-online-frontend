import React from 'react';
import ContactNumbers from '../contactNumbers';
import OpeningHours from './opening-hours';


const EmergencyRepair = () => {

  return <div className="govuk-grid-row govuk-body-m">
    <div className="govuk-grid-column-two-thirds">
      <h1 className='govuk-heading-xl lbh-heading-h1'>Your repair could be an emergency</h1>
      <h3 className='lbh-heading-h2'>Emergencies</h3>
      <p>
        An emergency is defined as something which could cause danger to
        someone’s health or safety or cause serious damage and destruction to
        property.
      </p>
      <br/>
      <ContactNumbers/>
      <p>
        Opening times:
      </p>
      <br/>
      <OpeningHours/>
      <p>
        Please do not call the emergency out of hours number if the repair is not urgent.
      </p>
      <p>
        If you can smell gas, you must report it immediately to
        the Gas Emergency Service <strong>0800 111 999</strong> or via textphone (minicom) on
        <strong> 0800 371 787</strong>
      </p>
    </div>
  </div>
};

export default EmergencyRepair;

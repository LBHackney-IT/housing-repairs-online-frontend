import Details from '../details';
import React from 'react';
import ContactNumbers from '../contactNumbers';
import OpeningHours from './opening-hours';
import {customerServicesTelephoneNumber} from '../../globals';


const NotEligible = () => {
  return (
    <div className="govuk-grid-row govuk-body-m">
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>The council may not be responsible for repairs at this property</h1>
        <h3 className='govuk-heading-m'>Emergencies</h3>
        <p>
          An emergency is defined as something which could cause danger to
          someone’s health or safety or cause serious damage and destruction to
          property.
        </p>
        <ContactNumbers/>
        <Details summary="Opening times" testid="opening-times">
          <OpeningHours/>
        </Details>
        <p>
          Please do not call the emergency out of hours number if the repair is
          not urgent. We may charge you a fee if the repair is not deemed an
          emergency.
        </p>
        <p>
          If you suspect you have a gas leak, you must report it immediately to
          the Gas Emergency Service <strong>0800 111 999</strong> or via textphone (minicom)
          on <strong>0800 371 787</strong>
        </p>
        <hr></hr>
        <h3>Non-emergency requests</h3>
        <p>
          If you think the council is responsible for your property, please call <strong>{customerServicesTelephoneNumber}</strong>.
        </p>
        <p>
          If you are a leaseholder you can still report communal repairs on <strong>{customerServicesTelephoneNumber}</strong>.
        </p>
      </div>
    </div>
  );
};

export default NotEligible;

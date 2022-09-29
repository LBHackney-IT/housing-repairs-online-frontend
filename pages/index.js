import WarningText from '../compoments/warningText';
import Details from '../compoments/details';
import TextLink from '../compoments/textLink';
import React from 'react';
import Link from 'next/link'
import ContactNumbers from '../compoments/contactNumbers';
import OpeningHours from '../compoments/report-repair/opening-hours';
import {customerServicesTelephoneNumber} from '../globals';

export default function Home() {

  return (
    <div className="govuk-grid-row govuk-body-m govuk-!-margin-top-7 lbh-body-m">
      <div className="govuk-grid-column-two-thirds">
        <h1 className={'govuk-heading-xl lbh-heading-h1'}>Request a repair</h1>
        <h2 className={'lbh-heading-h2'}>Before you start</h2>
        <WarningText  testid="landing-page-report-limit-warning" className="govuk-!-margin-top-4 lbh-body lbh-!-font-weight-bold">
          This service can only be used to request one repair at a time to a council property.
        </WarningText>
        <p className={'lbh-body-m'}>
          If you <strong>own the property</strong>, please see our <TextLink href="https://hackney.gov.uk/leaseholders-and-freeholders" target={'_blank'}>leaseholder contact details page</TextLink>.
        </p>
        <p className={'lbh-body-m'}>
        To request a repair for a <strong>communal area</strong>, please call customer services <strong>{customerServicesTelephoneNumber}</strong>.
        </p>
        <Details summary="What is a communal area?" className="govuk-!-margin-top-6" data-testid="landing-page-communal-prompt">
          <div data-testid='landing-page-communal-info'>
            <p>Communal repairs are usually in areas that people share.</p>
            <p>They can include:</p>
            <ul className={'govuk-list govuk-list--bullet lbh-list--bullet'}>
              <li>repairs to door entry systems</li>
              <li>lock repairs to communal doors</li>
              <li>lighting repairs to shared areas</li>
              <li>glazing repairs to shared doors or stairway windows</li>
              <li>roof and gutter repairs</li>
              <li>structure and external walls to your block</li>
            </ul>
          </div>
        </Details>
        <WarningText testid="landing-page-gas-warning" className="lbh-body lbh-!-font-weight-bold">
          If you suspect you have a gas leak, you must report it immediately
          to the Gas Emergency Service on 0800 111 999 or via textphone
          (minicom) on 0800 371 787
        </WarningText>
        <WarningText testid="landing-page-emergency-warning" className="lbh-body lbh-!-font-weight-bold">
          For other emergency repairs, please call customer services <strong>{customerServicesTelephoneNumber}</strong>.
        </WarningText>
        <Details summary="What is an emergency?" className="govuk-!-margin-top-6" testid="landing-page-emergency-prompt">
          <div data-testid='landing-page-emergency-info'>
            An emergency is defined as something which could cause danger to
            someone’s health or safety or cause serious damage and destruction
            to property.
            <ContactNumbers/>
            <p>
              Opening times:
            </p>
            <OpeningHours/>
          </div>
        </Details>
        <Link href="/report-repair/priority-list">
          <a role="button" draggable="false"
            className="govuk-button lbh-button govuk-button--start"
            data-module="govuk-button">
              Start now
            <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
            </svg>
          </a>
        </Link>
      </div>
    </div>
  );
}

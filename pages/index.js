import Details from '../compoments/details';
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="govuk-grid-row govuk-body-m govuk-!-margin-top-7 lbh-body-m">
      <div className="govuk-grid-column-two-thirds">
        <h1 className={'govuk-heading-xl lbh-heading-h1'}>Request a repair</h1>
        <h2 className={'lbh-heading-h2'}>Before you start</h2>

        <p className={'lbh-body-m'}>
          If you suspect you have a gas leak, you must report it immediately to the Gas Emergency Service (Cadent) on <strong>0800 111 999</strong> or via textphone (minicom) on <strong>0800 371 787</strong>
        </p>

        <p className={'lbh-body-m'}>
          For other emergency repairs - e.g. water leaks, no water, no heating, blocked drains - please call <strong>0208 356 3691</strong>. They cannot be raised online.
        </p>

        <p className={'lbh-body-m'}>
          To request a repair for a communal area outside of your dwelling, please call <strong>0208 356 3691</strong>. Leaseholders can also use this service.
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

        <Link href="/report-repair/priority-list">
          <a
            role="button"
            draggable="false"
            className="govuk-button lbh-button govuk-button--start"
            data-module="govuk-button"
          >
            Start now
            <svg
              className="govuk-button__start-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="17.5"
              height="19"
              viewBox="0 0 33 40"
              aria-hidden="true"
              focusable="false"
            >
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
            </svg>
          </a>
        </Link>
      </div>
    </div>
  );
}

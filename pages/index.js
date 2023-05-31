import WarningText from '../compoments/warningText';
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="govuk-grid-row govuk-body-m govuk-!-margin-top-7 lbh-body-m">
      <div className="govuk-grid-column-two-thirds">
        <h1 className={'govuk-heading-xl lbh-heading-h1'}>Request a repair</h1>
        <h2 className={'lbh-heading-h2'}>Before you start</h2>

        <p className={'lbh-body-m'}>
          Only council tenants can request repairs online. If you’re a council
          tenant, you can request:
        </p>

        <br />

        <ul className={'govuk-list govuk-list--bullet lbh-list--bullet'}>
          <li>non-emergency repairs</li>
          <li>internal repairs</li>
        </ul>

        <p className={'lbh-body-m'}>
          If you own the property, you cannot request a repair online - call{' '}
          <strong style={{ whiteSpace: 'nowrap' }}>020 8356 3691</strong>.
        </p>

        <WarningText
          testid="landing-page-report-limit-warning"
          className="govuk-!-margin-top-4 lbh-body lbh-!-font-weight-bold"
        >
          This service can only be used to request one repair at a time.
        </WarningText>

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

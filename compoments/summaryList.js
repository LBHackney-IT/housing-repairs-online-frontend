import React from 'react';
import Link from 'next/link'
export default function SummaryList ({summary, goToStep}) {

  return (
    <dl className="govuk-summary-list govuk-!-margin-bottom-9 lbh-body-m">
      {summary.map((o, i) => (
        <div className="govuk-summary-list__row" key={i}>
          <dt className="govuk-summary-list__key">
            {o.pageName}
          </dt>
          <dd className="govuk-summary-list__value">
            {o.value}
          </dd>
          <dd className="govuk-summary-list__actions">
            <Link
              href={o.link}
              className={'govuk-link'}
              onClick={(e)=>{
                e.preventDefault()
                goToStep(o.link, 'summary')
              }}>
              Change
            </Link>
            <span className="govuk-visually-hidden">{o.pageName}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

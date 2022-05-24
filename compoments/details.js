import React from 'react';

export default function Details({summary, children, testid }) {
  return (
    <>
      <details className="govuk-details" data-module="govuk-details" data-testid={testid}>
        <summary className="govuk-details__summary">
          <span className="govuk-details__summary-text">
            {summary}
          </span>
        </summary>
        <div className="govuk-details__text">
          {children}
        </div>
      </details>

    </>
  )
}

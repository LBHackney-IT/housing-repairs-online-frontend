import React from 'react';

export default function WarningText({ children, testid }) {
  return (
    <>
      <div className="govuk-warning-text" data-testid={testid}>
        <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
        <strong className="govuk-warning-text__text">
          <span className="govuk-warning-text__assistive">Warning</span>
          {children}
        </strong>
      </div>
    </>
  )
}

import React from 'react';

export default function BackLink({href, target, onClick, children }) {
  return (
    <>
      <a href={href} className="govuk-back-link" target={target} onClick={onClick}>{children}</a>
    </>
  )
}



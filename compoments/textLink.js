import React from 'react'

export default function TextLink({ href, target, children }) {
  return (
    <>
      <a href={href} className="govuk-link" target={target}>
        {children}
      </a>
    </>
  )
}

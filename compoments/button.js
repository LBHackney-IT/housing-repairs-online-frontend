import React, { useState, useEffect } from 'react'

export default function Button({
  onClick,
  children,
  preventDoubleClick = false,
  repairSubmitted = false,
}) {
  const [disabled, setDisabled] = useState(false)
  const [buttonText, setButtonText] = useState(children)

  useEffect(() => {
    if (repairSubmitted) setDisabled(true)
  }, [])

  const click = (e) => {
    if (preventDoubleClick) {
      setDisabled(true)
      setButtonText('Submitting')
    }
    onClick(e)
  }

  return (
    <button
      disabled={disabled ? 'disabled' : false}
      aria-disabled={disabled}
      className={`govuk-button lbh-button ${
        disabled ? 'govuk-button--disabled lbh-button--disabled' : ''
      }`}
      data-prevent-double-click={preventDoubleClick}
      onClick={click}
      data-module="govuk-button"
    >
      {buttonText}
    </button>
  )
}

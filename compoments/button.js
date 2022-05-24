import React, {useState} from 'react';

export default function Button({onClick, children, preventDoubleClick = false }) {
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState(children);
  const click = (e) => {
    if (preventDoubleClick) {
      setDisabled(true);
      setButtonText('Submitting');
    }
    onClick(e)
  }

  return (
    <button
      disabled={disabled ? 'disabled' : false}
      aria-disabled={disabled}
      className={`govuk-button ${disabled ? 'govuk-button--disabled' : '' }`}
      data-prevent-double-click={preventDoubleClick}
      onClick={click}
      data-module="govuk-button">
      {buttonText}
    </button>
  )
}

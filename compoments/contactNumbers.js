import React from 'react';
import {customerServicesTelephoneNumber, outOfHoursCustomerServicesTelephoneNumber} from '../globals';

export default function ContactNumbers({ }) {
  return (
    <>
      <p>
        Emergency Out of Hours Repairs - Telephone: <strong>{outOfHoursCustomerServicesTelephoneNumber}</strong>
      </p>
      <p>
        Emergency In Hours Repairs - Telephone:  <strong>{customerServicesTelephoneNumber}</strong>
      </p>
    </>
  )
}



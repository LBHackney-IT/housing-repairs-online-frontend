import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Button from '../button'
import { fetcher } from '../../helpers/fetcher'
import useSWR from 'swr'
import moment from 'moment'
import { useRouter } from 'next/router'
import Loader from '../loader'
import UnableToBook from './unable-to-book'
import Error from '../error'
import { customerServicesTelephoneNumber } from '../../globals'

const RepairAvailability = ({ handleChange, values, fromDate }) => {
  const [error, setError] = useState()
  const [value, setValue] = useState(values.availability?.appointmentSlotKey)
  const baseURL = '/api/availability'
  const params = {
    repairLocation: values.repairLocation?.value,
    repairProblem: values.repairProblem?.value,
    locationId: values.address?.locationId,
  }

  if (values.repairProblemBestDescription) {
    params['repairIssue'] = values.repairProblemBestDescription.value
  }

  const router = useRouter()

  if (fromDate) {
    params['fromDate'] = fromDate
  }
  const apiUrl = `${baseURL}?${new URLSearchParams(params).toString()}`
  const { data, dataError } = useSWR(apiUrl, fetcher)

  if (dataError)
    return (
      <Error
        name="summary"
        heading="An error occurred while looking for available appointments"
        body={`Please try again later or call ${customerServicesTelephoneNumber} to complete your repair request`}
      />
    )

  if (!data) return <Loader />

  let availability = {}
  let availabilityValues = {}

  let nextAppointmentSearchFromDate

  if (data) {
    if (data.length == 0) {
      return <UnableToBook />
    }
    let startTimes = data.map((d) => moment(d.startTime))
    nextAppointmentSearchFromDate = moment
      .max(startTimes)
      .add(1, 'day')
      .format('YYYY-MM-DD')

    data.forEach((d) => {
      const startDateTime = moment(d.startTime)
      const dateString = startDateTime.format('Do MMMM YYYY')
      const startTime = startDateTime.format('h:mma')
      const endDateTime = moment(d.endTime)
      const endTime = endDateTime.format('h:mma')
      const appointmentSlotKey = `${startDateTime.unix()}-${endDateTime.unix()}`
      const timeString = `${startTime} to ${endTime}`
      const timeStringSummary = `between ${timeString}`
      const appointmentSlotData = {
        timeString,
        startDateTime: d.startTime,
        endDateTime: d.endTime,
        appointmentSlotKey,
      }
      availability[dateString]
        ? availability[dateString].push(appointmentSlotData)
        : (availability[dateString] = [appointmentSlotData])
      availabilityValues[appointmentSlotKey] = {
        startDateTime: d.startTime,
        endDateTime: d.endTime,
        display: `${dateString} ${timeStringSummary}`,
      }
    })
  }

  const fieldName = 'availability'

  const Continue = () => {
    if (value) {
      let selectedAppointmentSlot = availabilityValues[value]
      return handleChange(fieldName, {
        startDateTime: selectedAppointmentSlot.startDateTime,
        endDateTime: selectedAppointmentSlot.endDateTime,
        display: selectedAppointmentSlot.display,
        appointmentSlotKey: value,
      })
    }
    setError('Required')
  }

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className="govuk-grid-row" data-cy="repair-availability">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-l lbh-heading-h1">
          When are you available?
        </h1>
        <p className="lbh-body-l">
          A responsible adult must be at the property for all of the repair
          appointment time slot and during the repair appointment.
        </p>
        <h3 className="govuk-!-padding-top-4">
          Please select a suitable time slot
        </h3>
        <hr />
        <div className={error ? 'govuk-form-group--error' : 'govuk-form-group'}>
          <span id={`${fieldName}-error`} className="govuk-error-message">
            {error}
          </span>
          <div className="govuk-radios" onChange={onChange}>
            {Object.keys(availability).map((date, i) => (
              <div key={i} className="govuk-!-padding-bottom-4">
                <h3 className="govuk-!-padding-top-4">{date}</h3>
                {availability[date].map((timeSlot, ti) => (
                  <div
                    className="govuk-radios__item lbh-radios"
                    key={`${i}-${ti}`}
                  >
                    <input
                      data-cy={`availability-slot-${i}-${ti}`}
                      className="govuk-radios__input govuk-input--width-10 "
                      id={`${fieldName}-${i}-${ti}`}
                      name={fieldName}
                      type="radio"
                      value={timeSlot.appointmentSlotKey}
                      defaultChecked={
                        values.availability?.startDateTime ===
                          timeSlot.startDateTime &&
                        values.availability?.endDateTime ===
                          timeSlot.endDateTime
                      }
                    />
                    <label
                      className="govuk-label govuk-radios__label lbh-label"
                      htmlFor={`${fieldName}-${i}-${ti}`}
                    >
                      {timeSlot.timeString}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          {fromDate ? (
            <a
              className="govuk-button govuk-button--secondary lbh-button lbh-button--secondary"
              onClick={() => {
                router.push(`${router.asPath}`, 'repair-availability', {
                  shallow: true,
                })
              }}
            >
              Previous 5 days
            </a>
          ) : (
            <a
              className="govuk-button govuk-button--secondary lbh-button lbh-button--secondary"
              onClick={() => {
                router.push(
                  `${router.asPath}/?fromDate=${nextAppointmentSearchFromDate}`,
                  `${router.asPath}/?next=true`,
                  { shallow: true }
                )
              }}
            >
              Next 5 days
            </a>
          )}
        </div>
        <Button onClick={Continue}>Continue</Button>
      </div>
    </div>
  )
}

RepairAvailability.propTypes = {
  storeAddresses: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default RepairAvailability

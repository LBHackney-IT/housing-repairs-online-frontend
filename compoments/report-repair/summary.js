import React, { useEffect, useState } from 'react'
import SummaryList from '../summaryList'
import Button from '../button'

const Summary = ({
  values,
  getNextStepFromCondition,
  submit,
  goToStep,
  repairSubmitted,
}) => {
  let [repairProblemLink, setRepairProblemLink] = useState('')
  let [repairProblemBestDescriptionLink, setRepairProblemBestDescriptionLink] =
    useState('')

  useEffect(() => {
    setRepairProblemLink(getNextStepFromCondition(values.repairLocation.value))
    setRepairProblemBestDescriptionLink(
      getNextStepFromCondition(values.repairProblem.value)
    )
  }, [values])

  const personalDetailsSummary = [
    {
      pageName: 'Repair address',
      value: values.address?.display,
      link: 'postcode',
    },
    {
      pageName: 'Appointment contact number',
      value: values.contactPersonNumber,
      link: 'contact-person',
    },
  ]
  const repairDetailsSummary = [
    {
      pageName: 'Where is the repair?',
      value: values.repairLocation?.display,
      link: 'repair-location',
    },
    {
      pageName: 'What is the repair?',
      value: values.repairProblem?.display,
      link: repairProblemLink,
    },
    {
      pageName: 'What best describes the repair?',
      value: values['repairProblemBestDescription']?.display,
      link: repairProblemBestDescriptionLink,
    },
    {
      pageName: 'Description',
      value: values.description?.text,
      link: 'repair-description',
    },
  ]
  const appointmentDetailsSummary = [
    {
      pageName: 'Date',
      value: values.availability?.display,
      link: 'repair-availability',
    },
    {
      pageName: 'Confirmation contact details',
      value: values.contactDetails?.value,
      link: 'contact-details',
    },
  ]

  return (
    <>
      {
        <div data-cy="summary">
          <div className="govuk-grid-row govuk-body-m">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl lbh-heading-h1">
                Request summary
              </h1>

              <h2 className="lbh-heading-h2 govuk-heading-m">
                Personal details
              </h2>
              <SummaryList
                goToStep={goToStep}
                summary={personalDetailsSummary}
              />

              <h2 className="lbh-heading-h2 govuk-heading-m">Repair details</h2>
              <SummaryList goToStep={goToStep} summary={repairDetailsSummary} />

              <h2 className="lbh-heading-h2 govuk-heading-m">
                Appointment details
              </h2>
              <SummaryList
                goToStep={goToStep}
                summary={appointmentDetailsSummary}
              />
            </div>
          </div>
          {repairSubmitted ? (
            <Button
              repairSubmitted={true}
              onClick={() =>
                console.log(
                  'The repair has already been successfully submitted.'
                )
              }
            >
              Repair Submitted
            </Button>
          ) : (
            <Button
              preventDoubleClick={true}
              onClick={() => {
                submit(values)
              }}
            >
              Submit
            </Button>
          )}
        </div>
      }
    </>
  )
}
export default Summary

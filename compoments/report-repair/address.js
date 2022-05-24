import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Select from '../select';
import TextLink from '../textLink';
import Button from '../button';
import useSWR from 'swr'
import {fetcher} from '../../helpers/fetcher';
import Loader from '../loader';
import Error from '../error';
import {customerServicesTelephoneNumber} from '../../globals';

const Address = ({handleChange, values}) => {
  const [state, setState] = useState({error: {}, value: 'null'});

  const { data, error } = useSWR(`/api/address?postcode=${values.postcode}`, fetcher)

  if (error) return <Error
    name="summary"
    heading="An error occurred while looking for your address"
    body={`Please try again later or call ${customerServicesTelephoneNumber} to complete your repair request`} />

  if (!data) return <Loader/>

  const addresses = data.map((a) => {
    a.display = [a.addressLine1, a.addressLine2, a.postCode].filter(x=>x).join(', ')
    return a
  })

  const found_addresses = `${addresses?.length} ${addresses?.length === 1 ? 'address': 'addresses'} found`

  const onChange = e => {
    setState({error: {}, value: JSON.parse(e.target.value)})
  }

  const Continue = e => {
    e.preventDefault();

    if (state.value === 'null') {
      return setState({error: {
        msg: 'Required',
        touched: true
      }})
    }

    return handleChange('address', {
      display: state.value.display,
      locationId: state.value.locationId
    });
  }

  return <div className="govuk-grid-row" data-cy="address">
    <div className="govuk-grid-column-two-thirds">
      <h1 className="govuk-heading-l">Select an address</h1>
      <form action="">
        <div className={state.error.msg ? 'govuk-form-group govuk-form-group--error' : 'govuk-form-group'}>
          <span id={'address-error'}
            className="govuk-error-message">
            {state.error.msg}
          </span>
          <label className="govuk-label" htmlFor="select-address-dropdown">
            Select an address
          </label>
          <Select
            input={{
              name: 'address',
              onChange: onChange
            }}
            meta={state.error}
            id={'select-address-dropdown'}
          >
            <option value="null">
              {found_addresses}
            </option>
            {addresses?.map((address, i) => (
              <option value={JSON.stringify(address)} key={i}>
                {address.display}
              </option>
            ))}
          </Select>
        </div>
        <TextLink href="not-eligible">I can&apos;t find my address on this list</TextLink>
        <br/>
        <br/>
        <Button onClick={Continue} >Continue</Button>
      </form>
    </div>
  </div>
};

Address.defaultProps = {
  addresses: []
};

Address.propTypes = {
  addresses: PropTypes.array,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default Address;

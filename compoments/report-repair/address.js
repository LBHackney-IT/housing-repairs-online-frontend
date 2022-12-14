import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Select from '../select';
import TextLink from '../textLink';
import Button from '../button';
import Loader from '../loader';
import Error from '../error';
import { customerServicesTelephoneNumber } from '../../globals';
import axios from 'axios';

const Address = ({ handleChange, values }) => {
  const name = 'address';
  const [state, setState] = useState({ error: {}, value: 'null' });
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(`/api/address?postcode=${values.postcode}`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.error(err)
        setError(err)
      })
  }, [])

  if (error)
    return (
      <Error
        name="summary"
        heading="An error occurred while looking for your address"
        body={`Please try again later or call ${customerServicesTelephoneNumber} to complete your repair request`}
      />
    );

  if (!data) return <Loader />;

  const addresses = data.map((a) => {
    a.display = [a.addressLine1, a.addressLine2, a.postCode]
      .filter((x) => x)
      .join(', ');
    return a;
  });

  const found_addresses = `${addresses?.length} ${
    addresses?.length === 1 ? 'address' : 'addresses'
  } found`;

  const onChange = (e) => {
    setState({ error: {}, value: JSON.parse(e.target.value) });
  };

  const verifyPropertyEligibility = (e) => {
    e.preventDefault();

    if (state.value === 'null') {
      return setState({
        error: {
          msg: 'Required',
          touched: true,
        },
      });
    } else {
      axios.get(`/api/propertyeligible?propertyId=${state.value.locationId}`)
      .then(res => {
        const isPropertyEligible = res.data.propertyEligible
        Continue(isPropertyEligible);
      })
      .catch(err => {
        console.error(err)
        setError(err)
      })
    }
  }

  const Continue = (isPropertyEligible = false) => {

    if (!isPropertyEligible) {
      return handleChange(name, {
        addressLine1: state.value.addressLine1,
        postCode: state.value.postCode,
        locationId: state.value.locationId,
        value: 'invalidProperty'
      });
    }
    return handleChange(name, {
      display: state.value.display,
      locationId: state.value.locationId,
      value: 'validProperty'
    });
  };

  return (
    <div className="govuk-grid-row" data-cy="address">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-l lbh-heading-h1">Select an address</h1>
        <form action="">
          <div
            className={
              state.error.msg
                ? 'govuk-form-group govuk-form-group--error'
                : 'govuk-form-group'
            }
          >
            <span id={'address-error'} className="govuk-error-message">
              {state.error.msg}
            </span>
            <Select
              input={{
                name: 'address',
                onChange: onChange,
              }}
              meta={state.error}
              id="select-address-dropdown"
              label="Select an address"
            >
              <option value="null">{found_addresses}</option>
              {addresses?.map((address, i) => (
                <option value={JSON.stringify(address)} key={i}>
                  {address.display}
                </option>
              ))}
            </Select>
          </div>
          <TextLink href="not-eligible">
            I can&apos;t find my address on this list
          </TextLink>
          <br />
          <br />
          <Button onClick={verifyPropertyEligibility}>Continue</Button>
        </form>
      </div>
    </div>
  );
};

Address.defaultProps = {
  addresses: [],
};

Address.propTypes = {
  addresses: PropTypes.array,
  values: PropTypes.object,
  handleChange: PropTypes.func,
};

export default Address;

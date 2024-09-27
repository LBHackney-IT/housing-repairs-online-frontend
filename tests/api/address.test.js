import axios from 'axios';
import { createRequest, createResponse } from 'node-mocks-http';
import handleAddress from '../../pages/api/address/index';
import { interceptAuthenticationRequest } from './helpers/helper'

jest.mock('axios');

const postCode = 'NW1 6EA';

const addressData = [{ addressLine1: 'Pitcairn house' }];

describe('/api/address', () => {
  beforeEach(() => {
    axios.create = jest.fn(() => axios);
    interceptAuthenticationRequest();
  });

  test('when called - returns address data', async () => {
    // Arrange
    const req = createRequest({
      method: 'get',
      query: { postcode: postCode },
    });

    const res = createResponse();

    const apiResponse = {
      status: 200,
      data: { addresses: addressData },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(apiResponse));

    // Act
    await handleAddress(req, res);

    // Assert
    expect(res._getStatusCode()).toBe(200);

    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(apiResponse.data)
    );
  });

  test('when request fails - returns 500', async () => {
    // Arrange

    const req = createRequest({
      method: 'get',
      query: { postcode: postCode },
    });

    const res = createResponse();

    axios.get.mockImplementationOnce(() => Promise.reject());

    // Act
    await handleAddress(req, res);

    // Assert
    expect(res._getStatusCode()).toBe(500);
  });
});
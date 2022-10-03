import axios from 'axios';
import { createRequest, createResponse } from 'node-mocks-http';
import handleRepair from '../../pages/api/repair/index';
import { interceptAuthenticationRequest } from './helpers/helper'

jest.mock('axios');

const requestId = "1234"
const raiseRepairData = { 
    postcode: "postcode",
    address: "address",
    location: "location",
    problem: "problem",
    issue: "issue",
    contactPersonNumber: "contact person number",
    description: "description",
    contactDetails: "contactDetails",
    time: "time"
};

describe('/api/repair', () => {
  beforeEach(() => {
    axios.create = jest.fn(() => axios);
    interceptAuthenticationRequest();
  });

  test('when called - raises a repair', async () => {
    // Arrange
    const req = createRequest({
      method: 'post',
      data: raiseRepairData
    });

    const res = createResponse();

    const apiResponse = {
      status: 200,
      data: requestId,
    };

    axios.post.mockImplementationOnce(() => Promise.resolve(apiResponse));

    // Act
    await handleRepair(req, res);

    // Assert
    expect(res._getStatusCode()).toBe(200);

    expect(JSON.parse(res._getData())).toEqual(apiResponse.data);
  });

  test('when request fails - returns 500', async () => {
    // Arrange

    const req = createRequest({
        method: 'post',
        data: raiseRepairData
      });
    const res = createResponse();

    axios.post.mockImplementationOnce(() => Promise.reject());

    // Act
    await handleRepair(req, res);

    // Assert
    expect(res._getStatusCode()).toBe(500);
  });
});

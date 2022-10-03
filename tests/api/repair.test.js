import axios from 'axios';
import { createMocks, createRequest, createResponse } from 'node-mocks-http';
import handleRepair from '../../pages/api/repair/index';

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
    // Mock auth request
    axios.create = jest.fn(() => axios);

    const mockJwt = 'token';

    const response = {
      status: 200,
      data: mockJwt,
    };

    axios.post.mockImplementationOnce(() => Promise.resolve(response));
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

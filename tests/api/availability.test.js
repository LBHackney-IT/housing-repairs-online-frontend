import axios from 'axios';
import { createMocks, createRequest, createResponse } from 'node-mocks-http';
import handleAvailability from '../../pages/api/availability/index';

jest.mock('axios');


const availableAppointmentData = [{ 
    someData: "blah blah blah"
 }];

describe('/api/availability', () => {
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

  test('when called - returns appointment availability', async () => {
    // Arrange
    const req = createRequest({
      method: 'get',
      query: { 
        repairLocation: "location",
        repairProblem: "problem",
        repairIssue: "issue",
        locationId: "locationId", 
        fromDate: "fromDate"
     },
    });

    const res = createResponse();

    const apiResponse = {
      status: 200,
      data: { availability: availableAppointmentData },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(apiResponse));

    // Act
    await handleAvailability(req, res);

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
      query: { 
        repairLocation: "location",
        repairProblem: "problem",
        repairIssue: "issue",
        locationId: "locationId", 
        fromDate: "fromDate"
     },
    });

    const res = createResponse();

    axios.get.mockImplementationOnce(() => Promise.reject());

    // Act
    await handleAvailability(req, res);

    // Assert
    expect(res._getStatusCode()).toBe(500);
  });
});

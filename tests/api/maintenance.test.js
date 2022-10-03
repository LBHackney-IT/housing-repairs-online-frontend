import axios from 'axios';
import { createMocks, createRequest, createResponse } from 'node-mocks-http';
import handleMaintenance from '../../pages/api/maintenance/index';

jest.mock('axios');

describe('/api/maintenance', () => {
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

  test('when called - returns maintenance status', async () => {
    // Arrange
    const req = createRequest({
      method: 'get'
    });

    const res = createResponse();

    const apiResponse = {
      status: 200,
      data: { maintenanceModeEnabled: true },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(apiResponse));

    // Act
    await handleMaintenance(req, res);

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
    });

    const res = createResponse();

    axios.get.mockImplementationOnce(() => Promise.reject());

    // Act
    await handleMaintenance(req, res);

    // Assert
    expect(res._getStatusCode()).toBe(500);
  });
});

import stubbedData from '../../fixtures/availableAppointments.json'

describe('SearchProperties', () => {
  const repairLocation = 'Kitchen'
  const repairProblem = 'Cupboards, including damaged cupboard doors'
  const repairIssue = 'Missing door'
  const locationId = '100023336956'
  const dummyData = stubbedData;

  let mockGetRequest;
  let AvailableAppointmentsGateway;

  beforeAll(() => {
    mockGetRequest =  jest.fn().mockImplementation(({url, params}) => Promise.resolve({data: dummyData}));
    AvailableAppointmentsGateway = require('../../../pages/api/gateways/AvailableAppointmentsGateway')(mockGetRequest);
  });

  test('api gets called appropriately', async () => {
    const result = await AvailableAppointmentsGateway({
      repairLocation,
      repairProblem,
      repairIssue,
      locationId
    });

    expect(mockGetRequest).toHaveBeenCalledWith(
      {
        uri:  '/Appointments/AvailableAppointments',
        params: {
          repairIssue: repairIssue,
          repairLocation: repairLocation,
          repairProblem: repairProblem,
          locationId: locationId
        }
      }
    )
    expect(result).toEqual(dummyData)
  });
});

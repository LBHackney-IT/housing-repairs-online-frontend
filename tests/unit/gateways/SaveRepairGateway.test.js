describe('SaveRepairGateway', () => {
  const repairLocation = 'Kitchen'
  const repairProblem = 'Cupboards, including damaged cupboard doors'
  const repairIssue = 'Missing door'
  const locationId = '100023336956'
  const dummyID = 'ABCD1234';

  let mockPostRequest;
  let SaveRepairGateway;

  beforeAll(() => {
    mockPostRequest =  jest.fn().mockImplementation(({url, params}) => Promise.resolve({data: dummyID}));
    SaveRepairGateway = require('../../../pages/api/gateways/SaveRepairGateway')(mockPostRequest);
  });

  test('api gets called appropriately', async () => {
    const result = await SaveRepairGateway({
      repairLocation,
      repairProblem,
      repairIssue,
      locationId
    });

    expect(mockPostRequest).toHaveBeenCalledWith(
      {
        uri:  '/repair',
        body: {
          repairIssue: repairIssue,
          repairLocation: repairLocation,
          repairProblem: repairProblem,
          locationId: locationId
        },
        headers: {'Content-Type': 'application/json'}
      }
    )
    expect(result).toEqual(dummyID)
  });
});

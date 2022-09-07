describe('CheckMaintenanceMode', () => {
  const dummyData = { maintenanceModeEnabled: true }
  let CheckMaintenanceModeGateway;
  let mockGetRequest;

  describe('when api is up', () => {
    beforeAll(() => {
      mockGetRequest =  jest.fn().mockImplementation(({url, params}) => Promise.resolve({ data: dummyData }));
      CheckMaintenanceModeGateway = require('../../../pages/api/gateways/CheckMaintenanceModeGateway')(mockGetRequest);
    });

    test('api gets called appropriately', async () => {
      const result = await CheckMaintenanceModeGateway();

      expect(mockGetRequest).toHaveBeenCalledWith(
        {uri: `/maintenance`}
      )

      expect(result).toEqual(dummyData)
    });
  });

});

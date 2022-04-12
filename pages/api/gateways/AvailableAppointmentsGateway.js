module.exports = makeGetRequest => {
  return async ({repairLocation, repairProblem, repairIssue, locationId, fromDate}) => {
    let result;

    result = await makeGetRequest({
      uri: '/Appointments/AvailableAppointments',
      params: {
        repairLocation: repairLocation,
        repairProblem: repairProblem,
        repairIssue: repairIssue,
        locationId: locationId,
        fromDate: fromDate
      }
    }).then(response => {
      return response.data;
    });

    return result;
  }
};

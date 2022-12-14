module.exports = makeGetRequest => {
  return async propertyId => {
    var result;
    result = await makeGetRequest({
      uri: `/propertyeligible?propertyId=${propertyId}`
    }).then(response => {
      return response.data;
    });

    return result;
  }
};

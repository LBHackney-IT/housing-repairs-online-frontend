
module.exports = makeGetRequest => {
  return async () => {
    let result;

    result = await makeGetRequest({
      uri: '/maintenance'
    }).then(response => {
      return response.data;
    });

    return result;
  }
};


module.exports = makePostRequest => {
  return async body => {
    let result;

    result = await makePostRequest({
      uri: '/repair',
      body,
      headers: {'Content-Type': 'application/json'},
    }).then(response => {
      return response.data;
    });

    return result;
  }
};

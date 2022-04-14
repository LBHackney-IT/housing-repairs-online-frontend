require('dotenv').config()

module.exports = axios => {
  return {
    makeGetRequest: ({uri, params ={}}) =>{
      var identifier = process.env.REPAIRS_API_IDENTIFIER
      var baseUrl = process.env.REPAIRS_API_BASE_URL;
      const axiosInstance = axios.create({
        baseURL: baseUrl
      })
      return axiosInstance.post(`/authentication?identifier=${identifier}`)
        .then(response => {
          var jwt = response.data;
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
          return axiosInstance.get(uri, {
            params: params
          });
        })
    },

    makePostRequest: ({uri, body ={}}) =>{
      var identifier = process.env.REPAIRS_API_IDENTIFIER
      var baseUrl = process.env.REPAIRS_API_BASE_URL;
      const axiosInstance = axios.create({
        baseURL: baseUrl
      })
      return axiosInstance.post(`/authentication?identifier=${identifier}`)
        .then(response => {
          var jwt = response.data;
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
          return axiosInstance.post(uri, body);
        })
    }
  }
}

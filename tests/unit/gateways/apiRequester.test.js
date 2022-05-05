describe('apiRequester', () => {
  let apiRequester;
  let mockedPost;
  let mockedGet;
  const api_url = 'https://repairs.api'
  const api_identifier = 'magic key';
  let mockedAxiosInstance;
  const jwt = '~~~jwt~~~';
  const uri = '/request/uri/'

  describe('when api is up', () => {
    beforeAll(() => {
      process.env.REPAIRS_API_BASE_URL = api_url
      process.env.REPAIRS_API_IDENTIFIER = api_identifier

      mockedPost = jest.fn().mockImplementation(() => Promise.resolve({data: jwt}));
      mockedGet = jest.fn().mockImplementation();
      mockedAxiosInstance = {
        post: mockedPost,
        get: mockedGet,
        defaults: {
          headers: {
            common: {}
          }
        }
      }
      const mockedCreate = jest.fn(()=>{return mockedAxiosInstance});

      const mockAxios = {
        create: mockedCreate
      }

      apiRequester = require('../../../pages/api/gateways/apiRequester')(mockAxios);
    });

    test('a get request is made with headers', async () => {
      const params = {
        a: 1, b: 2
      }
      await apiRequester.makeGetRequest({uri, params});

      expect(mockedPost).toHaveBeenCalledWith(
        `/authentication?identifier=${api_identifier}`
      )

      expect(mockedAxiosInstance.defaults.headers.common['Authorization']).toEqual(`Bearer ${jwt}`);

      expect(mockedGet).toHaveBeenCalledWith(uri, {'params': params})

    });

    test('a post request is made with authorization headers', async () => {
      const body = {
        a: 1, b: 2
      }
      await apiRequester.makePostRequest({uri, body});

      expect(mockedPost).toHaveBeenNthCalledWith(1, `/authentication?identifier=${api_identifier}`);

      expect(mockedAxiosInstance.defaults.headers.common['Authorization']).toEqual(`Bearer ${jwt}`);

      expect(mockedPost).toHaveBeenNthCalledWith(2, uri, body);
    });

    test('a post request is made with supplied headers', async () => {
      const body = {
        a: 1, b: 2
      }
      const headers = {
        'foo':'bar'
      }
      await apiRequester.makePostRequest({uri, body, headers});

      expect(mockedPost).toHaveBeenNthCalledWith(1, `/authentication?identifier=${api_identifier}`);

      expect(mockedAxiosInstance.defaults.headers.common['Authorization']).toEqual(`Bearer ${jwt}`);

      expect(mockedPost).toHaveBeenNthCalledWith(2, uri, body, {headers: headers});
    });
  });
});

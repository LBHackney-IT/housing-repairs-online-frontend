import axios from 'axios';

export const interceptAuthenticationRequest = () => {
    const mockJwt = 'token';

    const response = {
      status: 200,
      data: mockJwt,
    };

    axios.post.mockImplementationOnce(() => Promise.resolve(response));
}
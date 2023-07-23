import axios from 'axios';

const { REACT_APP_API_KEY } = process.env;

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1';
const REFRESH_BASE_URL = 'https://securetoken.googleapis.com/v1';

const authAxios = axios.create({ baseURL: BASE_URL });
const refreshAxios = axios.create({ baseURL: REFRESH_BASE_URL });

export const refreshTokenApi = refreshToken => {
  return refreshAxios
    .post('/token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })
    .then(response => {
      return {
        token: response.data.id_token,
        refreshToken: response.data.refresh_token,
      };
    });
};

export const loginUser = ({ email, password }) => {
  return authAxios
    .post(
      // '/accounts:signUp',
      '/accounts:signInWithPassword',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
      {
        params: {
          key: REACT_APP_API_KEY,
        },
      },
    )
    .then(response => ({
      token: response.data.idToken,
      refreshToken: response.data.refreshToken,
    }))
    .catch(err => console.log(err));
};

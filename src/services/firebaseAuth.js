import axios from 'axios';

const { REACT_APP_API_KEY } = process.env;

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1';
// accounts:signInWithPassword?key=
const authAxios = axios.create({ baseURL: BASE_URL });

export const loginUser = ({ email, password }) => {
  return authAxios
    .post(
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
    .then(response => response.data.idToken)
    .catch(err => console.log(err));
};

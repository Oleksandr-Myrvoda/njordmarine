import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { refreshTokenApi } from 'services/firebaseAuth';
import { useAuthContext } from 'context/AuthProvider';

// Создаем контекст
const ErrorContext = createContext();
const useSetError = () => {
  return useContext(ErrorContext);
};

const ErrorProvider = ({ children }) => {
  const [errorOptions, setErrorOptions] = useState(null);
  const { refreshToken, setToken, unsetToken } = useAuthContext();

  useEffect(() => {
    if (!errorOptions) {
      return;
    }
    const { error, cb } = errorOptions;
    console.dir(error);

    if (error.response.status === 401 || error.response.status === 400) {
      console.log('refreshToken', refreshToken);
      refreshTokenApi(refreshToken)
        .then(tokenData => {
          cb(tokenData.token);
          setToken(tokenData);
        })
        .catch(() => unsetToken())
        .finally(() => setErrorOptions(null));
      // refreshToken -> setToken(newToken) -> cb()
      // reRequest with last funk
    }
  }, [errorOptions, refreshToken, setToken, unsetToken]);

  return (
    <ErrorContext.Provider value={setErrorOptions}>
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorProvider, useSetError };

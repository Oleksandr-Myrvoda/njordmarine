import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { refreshTokenApi } from 'services/firebaseAuth';
import { useAuthContext } from 'context/AuthProvider';

// Создаем контекст
const ErrorContext = createContext();
const useSetError = () => {
  const { setErrorOptions } = useContext(ErrorContext);
  return setErrorOptions;
};

export const useSetOtherError = () => {
  const { setError } = useContext(ErrorContext);
  return setError;
};

const ErrorProvider = ({ children }) => {
  const [errorOptions, setErrorOptions] = useState(null);
  const { refreshToken, setToken, unsetToken } = useAuthContext();
  const [error, setError] = useState(null);

  const providerValue = useMemo(() => {
    return { setErrorOptions, setError };
  }, []);

  useEffect(() => {
    if (!errorOptions) {
      return;
    }
    const { error, cb } = errorOptions;
    console.dir(error);

    if (error.response.status === 401) {
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

  useEffect(() => {
    if (error) {
      // toast.error(error.message); -> доробити
      const id = setTimeout(() => {
        setError(null);
        clearTimeout(id);
      }, 1000);
    }
  }, [error]);

  return (
    <ErrorContext.Provider value={providerValue}>
      {error && <h1>{error.message}</h1>}
      {/* <Toastify {...props} /> */}
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorProvider, useSetError };

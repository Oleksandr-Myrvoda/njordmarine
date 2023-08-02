import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { refreshTokenApi } from 'services/firebaseAuth';
import { useAuthContext } from 'context/AuthProvider';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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
  const { t } = useTranslation();
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
    }
  }, [errorOptions, refreshToken, setToken, unsetToken]);

  useEffect(() => {
    if (error) {
      const id = setTimeout(() => {
        setError(null);
        clearTimeout(id);
      }, 1000);
    }
  }, [error]);

  return (
    <ErrorContext.Provider value={providerValue}>
      {children}
      {error && toast.error(`${t('common.toast')}`)}
    </ErrorContext.Provider>
  );
};

export { ErrorProvider, useSetError };

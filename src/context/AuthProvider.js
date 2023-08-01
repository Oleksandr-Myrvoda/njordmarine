import { createContext, useContext, useEffect, useState } from 'react';

// Создаем контекст
const AuthContext = createContext();
const useAuthContext = () => {
  return useContext(AuthContext);
};

// Создаем функцию-провайдер для контекста, где устанавливаем начальное значение токена (null или пустая строка)
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('token'));
    } catch (error) {
      return null;
    }
  });

  const unsetToken = () => setToken('');
  const isLogin = Boolean(token);

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token: token?.token,
        refreshToken: token?.refreshToken,
        setToken,
        unsetToken,
        isLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuthContext };

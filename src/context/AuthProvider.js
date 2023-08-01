import { createContext, useState, useContext, useEffect } from 'react';

// Создаем контекст
const AuthContext = createContext();
const useAuthContext = () => {
  return useContext(AuthContext);
};

// Создаем функцию-провайдер для контекста, где устанавливаем начальное значение токена (null или пустая строка)
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

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

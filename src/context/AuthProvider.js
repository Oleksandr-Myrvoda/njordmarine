import { createContext, useState, useContext, useEffect } from 'react';

// Создаем контекст
const AuthContext = createContext();
const useAuthContext = () => {
  return useContext(AuthContext);
};

// Создаем функцию-провайдер для контекста, где устанавливаем начальное значение токена (null или пустая строка)
const AuthProvider = ({ children }) => {
  const storedToken = JSON.parse(localStorage.getItem('token'));
  const initialToken = typeof storedToken === 'string' ? storedToken : '';

  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  const unsetToken = () => setToken('');
  const isLogin = Boolean(token);
  // console.log('token', token.token);

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token: token.token,
        refreshToken: token.refreshToken,
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

// Теперь, в любом компоненте вашего приложения, вы можете использовать хук useContext для получения доступа к значению токена:
// javascript
// Copy code
// import { useContext } from 'react';
// import { AuthContext } from './AuthContext';

// const MyComponent = () => {
//   // Используем хук useContext для доступа к контексту AuthContext
//   const { token } = useContext(AuthContext);

//   // Теперь у вас есть доступ к значению токена
//   console.log(token);

//   return <div>{/* Ваш код компонента */}</div>;
// };

// export default MyComponent;

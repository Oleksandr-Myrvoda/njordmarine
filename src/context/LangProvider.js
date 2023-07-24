import { createContext, useState, useContext, useEffect } from 'react';

// Создаем контекст
const LangContext = createContext();
const useLangContext = () => {
  return useContext(LangContext);
};

// Создаем функцию-провайдер для контекста, где устанавливаем начальное значение
const LangProvider = ({ children }) => {
  //   const storedToken = JSON.parse(localStorage.getItem('language'));
  //   const initialToken = typeof storedToken === 'string' ? storedToken : 'en';

  const [language, setLanguage] = useState(
    JSON.parse(localStorage.getItem('language')),
  );
  // console.log('language', language);
  useEffect(() => {
    localStorage.setItem('language', JSON.stringify(language));
  }, [language]);

  return (
    <LangContext.Provider value={{ language, setLanguage }}>
      {children}
    </LangContext.Provider>
  );
};

export { LangContext, LangProvider, useLangContext };

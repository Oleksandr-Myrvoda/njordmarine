import { createContext, useState, useContext, useCallback } from 'react';

// Создаем контекст
const LangContext = createContext();
const useLangContext = () => {
  return useContext(LangContext);
};

// Создаем функцию-провайдер для контекста, где устанавливаем начальное значение
const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(
    localStorage.getItem('i18nextLng') === 'ru-RU' ||
      localStorage.getItem('i18nextLng') === 'ru'
      ? 'ru'
      : 'en',
  );

  const handleLangChange = useCallback(lang => {
    setLang(lang);
  }, []);

  return (
    <LangContext.Provider value={{ lang, handleLangChange }}>
      {children}
    </LangContext.Provider>
  );
};

export { LangContext, LangProvider, useLangContext };

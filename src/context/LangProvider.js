import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

// Создаем контекст
const LangContext = createContext();
const useLangContext = () => {
  return useContext(LangContext);
};

// Создаем функцию-провайдер для контекста, где устанавливаем начальное значение
const LangProvider = ({ children }) => {
  //   const storedToken = JSON.parse(localStorage.getItem('language'));
  //   const initialToken = typeof storedToken === 'string' ? storedToken : 'en';

  // const [language, setLanguage] = useState(
  //   JSON.parse(localStorage.getItem('i18nextLng')) === 'ru-RU' ||
  //     JSON.parse(localStorage.getItem('i18nextLng')) === 'ru'
  //     ? 'ru'
  //     : 'en',
  // );
  const [lang, setLang] = useState(
    localStorage.getItem('i18nextLng') === 'ru-RU' ||
      localStorage.getItem('i18nextLng') === 'ru'
      ? 'ru'
      : 'en',
  );

  const handleLangChange = useCallback(lang => {
    console.log('setLang(lang)', lang);
    setLang(lang);
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('lang', JSON.stringify(lang));
  // }, [lang]);

  return (
    <LangContext.Provider value={{ lang, handleLangChange }}>
      {children}
    </LangContext.Provider>
  );
};

export { LangContext, LangProvider, useLangContext };

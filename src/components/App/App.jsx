import { LangProvider } from 'context/LangProvider';
import { AdminProvider } from 'context/AdminProvider';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer } from 'react-toastify';
import Footer from 'components/Footer';
import Header from 'components/Header/Header';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import { Suspense, useState, useEffect, useRef } from 'react';
import useOutsideClickDetector from 'hooks/useOutsideClickDetector';
import Loader from 'common/Loader/Loader';

import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

function App() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(prevIsOpen => !prevIsOpen);

  const closeSidebar = () => setIsOpen(false);

  const cardRef = useRef(null);
  // useOutsideClickDetector(cardRef, toggleSidebar, isOpen);

  useEffect(() => {
    if (isDesktop) setIsOpen(false);
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isDesktop, isOpen]);

  return (
    <>
      <div className={s.emptyHeaderFull}></div>
      <div className={s.mainContainer}>
        {isDesktop && (
          <Suspense fallback={<Loader />}>
            <Sidebar />
          </Suspense>
        )}
        {!isDesktop && (
          <Suspense fallback={<Loader />}>
            <LangProvider>
              <div ref={isOpen ? cardRef : null}>
                <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />
              </div>
            </LangProvider>
          </Suspense>
        )}

        <div className={s.mainWrapper}>
          <div className={s.container}>
            <div className={s.content}>
              <AdminProvider>
                <LangProvider>
                  <Suspense fallback={<Loader />}>
                    <div className={s.emptyHeader}></div>
                    <Header
                      toggleSidebar={toggleSidebar}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                  </Suspense>

                  <Main />
                </LangProvider>
              </AdminProvider>
            </div>

            {isDesktop && <Footer />}
          </div>
        </div>
        <ToastContainer theme="colored" />
      </div>
      {!isDesktop && <Footer />}
      <div className={s.emptyFooter}></div>
    </>
  );
}

export default App;

//
// npm install --save-dev prettier eslint
// npx mrm@2 lint-staged
// npm i @emotion/react
// npm install react-router-dom@5
// api-----------------------------------
// npm i express mongodb --save
// npm i nodemon --save-dev

// languages-----------------------------------
// npm install react-i18next i18next --save
// # if you'd like to detect user language and load translation
// npm install i18next-http-backend i18next-browser-languagedetector --save

//form -------------------------------
// npm install react-hook-form
// npm i @emailjs/browser

// npm install --save-dev prop-types
// npm install react-icons --save
// npm install modern-normalize
// npm i nanoid
// npm i react-toastify
// npm install axios
// npm install --save react-spinners
// npm i react-use

// CI=false npm run build - netlify

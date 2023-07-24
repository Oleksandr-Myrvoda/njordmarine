import { useEffect, useState, useRef, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useOutsideClickDetector from 'hooks/useOutsideClickDetector';
import { useAuthContext } from 'context/AuthProvider';
import { LangProvider } from 'context/LangProvider';

import BrochureButton from 'common/BrochureButton';
import Contacts from 'common/Contacts';
import Sidebar from 'components/Sidebar';
import { contactsConfig } from 'data/contacts';
import burgerOpen from '../../images/List-Right.svg';
import burgerClose from '../../images/List-Close.png';
import logoHeaderMob from '../../images/Logo-header-mob.svg';
import s from './Header.module.css';
import LanguageSwitcher from 'common/LanguageSwitcher/LanguageSwitcher';

const Header = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin, unsetToken } = useAuthContext();
  const toggleSidebar = () => setIsOpen(prevIsOpen => !prevIsOpen);

  const cardRef = useRef(null);
  useOutsideClickDetector(cardRef, toggleSidebar, isOpen);

  useEffect(() => {
    if (isDesktop) setIsOpen(false);
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isDesktop, isOpen]);

  return (
    <header ref={cardRef} className={s.mainHeader}>
      {/* {isLogin && (
        <button type="button" onClick={() => unsetToken()}>
          Logout
        </button>
      )} */}

      {isDesktop ? (
        <>
          <Contacts contactsConfig={contactsConfig} />

          {isLogin && (
            <button
              className={s.logoutBtn}
              type="button"
              onClick={() => unsetToken()}
            >
              Logout
            </button>
          )}

          <Suspense fallback={<h2>"Loading..."</h2>}>
            <LangProvider>
              <LanguageSwitcher />
            </LangProvider>
          </Suspense>
          <BrochureButton />
        </>
      ) : (
        <>
          <div className={s.headerMob}>
            <NavLink to="/">
              <img src={logoHeaderMob} alt="logo" />
            </NavLink>

            {isLogin && (
              <button
                className={s.menuBtn}
                type="button"
                onClick={() => unsetToken()}
              >
                Logout
              </button>
            )}

            <button type="button" className={s.menuBtn} onClick={toggleSidebar}>
              {t('navigation.mobileMenu')}
              <img src={isOpen ? burgerClose : burgerOpen} alt="list" />
            </button>

            <Sidebar isOpen={isOpen} />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

import { useEffect, useState, useRef, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'context/AuthProvider';
import { contactsConfig } from 'data/contacts';

import BrochureButton from 'common/BrochureButton';
import Contacts from 'common/Contacts';
import LanguageSwitcher from 'common/LanguageSwitcher/LanguageSwitcher';
import Loader from 'common/Loader/Loader';

import burgerOpen from '../../images/List-Right.svg';
import burgerClose from '../../images/List-Close.svg';
import logoHeaderMob from '../../images/Logo-header-mob.svg';
import s from './Header.module.css';

const Header = ({ toggleSidebar, isOpen, setIsOpen }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const { t } = useTranslation();

  const { isLogin, unsetToken } = useAuthContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef();

  const cardRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledHeight = window.scrollY;
      const screenHeight = window.innerHeight;
      const scrollThreshold = 0.1 * screenHeight;

      setIsScrolled(scrolledHeight > scrollThreshold);
    };

    const handleResize = () => {
      const contentHeight = scrollRef.current.clientHeight;
      const screenHeight = window.innerHeight;
      const scrollThreshold = 0.1 * screenHeight;

      setIsScrolled(contentHeight > screenHeight * 0.9);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`${s.fixedHeader} ${isScrolled && s.fixedHeaderScroll}`}
      ref={scrollRef}
    >
      <header ref={cardRef} className={s.mainHeader}>
        {isDesktop ? (
          <>
            <Contacts contactsConfig={contactsConfig} isHeader={true} />

            {isLogin && (
              <button
                className={s.logoutBtn}
                type="button"
                onClick={() => unsetToken()}
              >
                {t('common.logout')}
              </button>
            )}

            <Suspense
            //  fallback={<Loader />}
            >
              <LanguageSwitcher />
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
                  {t('common.logout')}
                </button>
              )}

              <Suspense
              // fallback={<Loader />}
              >
                <LanguageSwitcher />
              </Suspense>

              <button
                type="button"
                className={s.menuBtn}
                onClick={toggleSidebar}
              >
                <span className={s.menuBtnText}>
                  {t('navigation.mobileMenu')}
                  <img src={isOpen ? burgerClose : burgerOpen} alt="list" />
                </span>
              </button>
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default Header;

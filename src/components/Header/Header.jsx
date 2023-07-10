import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import BigButton from 'common/BigButton';
import BrochureButton from 'common/BrochureButton';
import Contacts from 'common/Contacts';
import Sidebar from 'components/Sidebar';
import { contactsConfig } from 'data/contacts';
import burgerOpen from '../../images/List-Right.svg';
import burgerClose from '../../images/List-Close.png';
import logoHeaderMob from '../../images/Logo-header-mob.svg';
import s from './Header.module.css';

const Header = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(prevIsOpen => !prevIsOpen);

  useEffect(() => {
    if (isDesktop) setIsOpen(false);

    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isDesktop, isOpen]);

  return (
    <header className={s.mainHeader}>
      {isDesktop ? (
        <>
          <Contacts contactsConfig={contactsConfig} />

          <ul className={s.language}>
            <li>RU</li>
            <li>|</li>
            <li>EN</li>
          </ul>
          <BrochureButton />
          {/* <button className={s.brochureBtn} type="button">
            Скачать брошюру
          </button> */}
          {/* <BigButton text="Скачать брошюру" isGray={true} /> */}
        </>
      ) : (
        <>
          <div className={s.headerMob}>
            <img src={logoHeaderMob} alt="logo" />
            <button type="button" className={s.menuBtn} onClick={toggleSidebar}>
              Меню <img src={isOpen ? burgerClose : burgerOpen} alt="list" />
            </button>
            <Sidebar isOpen={isOpen} />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

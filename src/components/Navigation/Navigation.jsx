import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import NavItem from './NavItem';
import { servicesListConfig } from 'data/services-list';
import { sparesListConfig } from 'data/spares-list';
import s from './Navigation.module.css';

const Navigation = ({ closeSidebar }) => {
  const { t } = useTranslation();
  const [activeMenu, setActiveMenu] = useState(null);
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  const handleMenuClick = menuName => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <nav className={s.nav}>
      <div
        onClick={() => {
          handleMenuClick('home');
          !isDesktop && closeSidebar();
        }}
      >
        <NavItem name={`01. ${t('navigation.nav1')}`} path="/home" />
      </div>

      {/* ======= ABOUT COMPANY ======= */}

      <div onClick={() => handleMenuClick('company')}>
        <NavItem name={`02. ${t('navigation.nav2')}`} path="/about-company" />
      </div>

      <div
        className={`${s.insideMenu} ${
          activeMenu === 'company' ? s.active : ''
        }`}
      >
        <div onClick={() => !isDesktop && closeSidebar()}>
          <NavItem
            name={t('navigation.aboutCompany.name1')}
            path="/about-company/about-us"
          />
        </div>
        <div onClick={() => !isDesktop && closeSidebar()}>
          <NavItem
            name={t('navigation.aboutCompany.name2')}
            path="/about-company/our-team"
            onClick={() => !isDesktop && closeSidebar()}
          />
        </div>
      </div>

      {/* ======= SERVICES ======= */}

      <div onClick={() => handleMenuClick('services')}>
        <NavItem name={`03. ${t('navigation.nav3')}`} path="/services" />
      </div>

      {!isDesktop && (
        <ul
          className={`${s.insideMenu} ${
            activeMenu === 'services' ? s.active : ''
          }`}
        >
          {servicesListConfig.map(({ name, to }, index) => (
            <li key={index} onClick={() => !isDesktop && closeSidebar()}>
              <NavItem name={t(name)} path={`/services/${to}`} />
            </li>
          ))}
        </ul>
      )}

      {/* ======= SPARES ======= */}

      <div onClick={() => handleMenuClick('spares')}>
        <NavItem name={`04. ${t('navigation.nav4')}`} path="/spares" />
      </div>

      {!isDesktop && (
        <ul
          className={`${s.insideMenu} ${
            activeMenu === 'spares' ? s.active : ''
          }`}
        >
          {sparesListConfig.map(({ name, to }, index) => (
            <li key={index} onClick={() => !isDesktop && closeSidebar()}>
              <NavItem name={t(name)} path={`/spares/${to}`} />
            </li>
          ))}
        </ul>
      )}

      {/* ======= CONTACTS ======= */}

      <div
        onClick={() => {
          handleMenuClick('contacts');
          !isDesktop && closeSidebar();
        }}
      >
        <NavItem name={`05. ${t('navigation.nav5')}`} path="/contacts" />
      </div>

      {/* ======= ADMIN ======= */}

      {/* <div
        onClick={() => {
          handleMenuClick('admin');
          !isDesktop && closeSidebar();
        }}
      >
        <NavItem name={'admin'} path="/admin" />
      </div> */}
    </nav>
  );
};

export default Navigation;

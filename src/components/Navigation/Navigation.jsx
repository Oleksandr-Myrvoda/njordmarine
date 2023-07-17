import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NavItem from './NavItem';
import { servicesListConfig } from 'data/services-list';
import { sparesListConfig } from 'data/spares-list';
import s from './Navigation.module.css';

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  const handleMenuClick = menuName => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <nav className={s.nav}>
      {/* <NavItem name="01. Главная" path="/" /> */}
      <div onClick={() => handleMenuClick('home')}>
        <NavItem name="01. Главная" path="/home" />
      </div>

      {/* ======= ABOUT COMPANY ======= */}

      <div onClick={() => handleMenuClick('company')}>
        <NavItem name="02. О Компании" path="/about-company" />
      </div>
      {activeMenu === 'company' && (
        <>
          <NavItem name="О нас" path="/about-company/about-us" />
          <NavItem name="Наша команда" path="/about-company/our-team" />
        </>
      )}

      {/* ======= SERVICES ======= */}

      <div onClick={() => handleMenuClick('services')}>
        <NavItem name="03. Услуги" path="/services" />
      </div>

      {activeMenu === 'services' && !isDesktop && (
        <ul>
          {servicesListConfig.map(({ name, to }, index) => (
            <li key={index}>
              <NavItem name={name} path={`/services/${to}`} />
            </li>
          ))}
        </ul>
      )}

      {/* ======= SPARES ======= */}
      <div onClick={() => handleMenuClick('spares')}>
        <NavItem name="04. Запчасти" path="/spares" />
      </div>

      {activeMenu === 'spares' && !isDesktop && (
        <ul>
          {sparesListConfig.map(({ name, to }, index) => (
            <li key={index}>
              <NavItem name={name} path={`/spares/${to}`} />
            </li>
          ))}
        </ul>
      )}

      {/* ======= CONTACTS ======= */}
      <div onClick={() => handleMenuClick('contacts')}>
        <NavItem name="05. Контакты" path="/contacts" />
      </div>
    </nav>
  );
};

export default Navigation;

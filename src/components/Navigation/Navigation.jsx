import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NavItem from './NavItem';
import { servicesListConfig } from 'data/services-list';
import { sparesListConfig } from 'data/spares-list';
import s from './Navigation.module.css';

const Navigation = () => {
  const [isActive, setIsActive] = useState(true);

  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  return (
    <nav className={s.nav}>
      {/* <NavItem name="01. Главная" path="/" /> */}
      <NavItem name="01. Главная" path="/home" />

      {/* ======= ABOUT COMPANY ======= */}

      <NavItem name="02. О Компании" path="/about-company" />
      {isActive && (
        <>
          <NavItem name="О нас" path="/about-company/about-us" />
          <NavItem name="Наша команда" path="/about-company/our-team" />
        </>
      )}

      {/* ======= SERVISES ======= */}

      <NavItem name="03. Услуги" path="/services" />

      {isActive && !isDesktop && (
        <ul>
          {servicesListConfig.map(({ name, to }, index) => (
            <li key={index}>
              <NavItem name={name} path={`/services/${to}`} />
            </li>
          ))}
        </ul>
      )}

      {/* ======= SPARES ======= */}

      <NavItem name="04. Запчасти" path="/spares" />

      {isActive && !isDesktop && (
        <ul>
          {sparesListConfig.map(({ name, to }, index) => (
            <li key={index}>
              <NavItem name={name} path={`/spares/${to}`} />
            </li>
          ))}
        </ul>
      )}

      {/* ======= CONTACTS ======= */}

      <NavItem name="05. Контакты" path="/contacts" />
    </nav>
  );
};

export default Navigation;

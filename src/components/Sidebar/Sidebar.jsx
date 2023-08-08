import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import BrochureButton from 'common/BrochureButton';
import Contacts from 'common/Contacts';
import Navigation from '../Navigation/Navigation';
import logo from 'images/Logo.svg';
import { contactsConfig } from 'data/contacts';
import { Suspense, useState, useEffect, useRef } from 'react';
import useOutsideClickDetector from 'hooks/useOutsideClickDetector';
import s from './Sidebar.module.css';

const Sidebar = ({ isOpen, toggleSidebar, closeSidebar }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  const cardRef = useRef(null);
  useOutsideClickDetector(cardRef, toggleSidebar, isOpen);
  // useOutsideClickDetector(cardRef, closeSidebar, isOpen);

  return (
    <>
      {/* <div className={s.hideSibebar}></div> */}
      <div ref={cardRef} className={clsx(s.sidebar, isOpen && s.isOpen)}>
        {isDesktop && (
          <NavLink to="/" className={s.logo}>
            <img src={logo} alt="logo" />
          </NavLink>
        )}
        <div className={s.mobMenu}>
          <Navigation />

          {!isDesktop && (
            <div className={s.mob}>
              <BrochureButton />

              <Contacts
                contactsConfig={contactsConfig}
                isContactsPage={false}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Sidebar;

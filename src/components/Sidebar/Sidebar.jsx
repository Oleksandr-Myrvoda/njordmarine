import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import BrochureButton from 'common/BrochureButton';
import Contacts from 'common/Contacts';
import Navigation from '../Navigation/Navigation';
import logo from 'images/Logo.svg';
import logoBig from 'images/logo-big.svg';
import { contactsConfig } from 'data/contacts';
import { Suspense, useState, useEffect, useRef } from 'react';

import s from './Sidebar.module.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const isDesktopBig = useMediaQuery({ query: '(min-width: 2560px)' });
  const cardRef = useRef(null);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeSidebar();
    }
  };

  return (
    <>
      <div className={`${isOpen && s.backdrop}`} onClick={handleBackdropClick}>
        <div ref={cardRef} className={clsx(s.sidebar, isOpen && s.isOpen)}>
          {isDesktop && (
            <NavLink to="/" className={s.logo}>
              <img src={`${!isDesktopBig ? logo : logoBig}`} alt="logo" />
            </NavLink>
          )}
          <div className={s.mobMenu}>
            <Navigation closeSidebar={closeSidebar} />

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
      </div>
    </>
  );
};
export default Sidebar;

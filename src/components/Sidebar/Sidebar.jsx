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
import Image from 'common/Image/Image';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  const cardRef = useRef(null);
  // useOutsideClickDetector(cardRef, toggleSidebar, isOpen);

  // const handleInsideClick = event => {
  //   if (event.target.tagName !== 'BUTTON') {
  //     setIsOpen(false);
  //   }
  // };

  // useOutsideClickDetector(cardRef, handleInsideClick, isOpen);
  // useOutsideClickDetector(cardRef, closeSidebar, isOpen);

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
              <Image src={logo} alt="logo" />
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

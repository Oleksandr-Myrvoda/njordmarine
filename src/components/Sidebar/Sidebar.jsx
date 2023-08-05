import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import BrochureButton from 'common/BrochureButton';
import Contacts from 'common/Contacts';
import Navigation from '../Navigation/Navigation';
import logo from 'images/Logo.svg';
import { contactsConfig } from 'data/contacts';
import s from './Sidebar.module.css';

const Sidebar = ({ isOpen }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  return (
    <>
      <div className={s.hideSibebar}></div>
      <div className={clsx(s.sidebar, isOpen && s.isOpen)}>
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

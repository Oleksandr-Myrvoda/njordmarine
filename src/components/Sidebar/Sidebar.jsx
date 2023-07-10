import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import BrochureButton from 'common/BrochureButton';
import Contacts from 'common/Contacts';
import Navigation from '../Navigation/Navigation';
import Logo from 'images/Logo.svg';
import { contactsConfig } from 'data/contacts';
import s from './Sidebar.module.css';

const Sidebar = ({ isOpen }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  const logo1 = Logo;

  return (
    <div className={clsx(s.sidebar, isOpen && s.isOpen)}>
      {isDesktop && (
        <div className={s.logo}>
          <img src={logo1} alt="logo" />
        </div>
      )}
      <div className={s.mobMenu}>
        <Navigation />

        {!isDesktop && (
          <div className={s.mob}>
            <BrochureButton />

            <Contacts contactsConfig={contactsConfig} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Sidebar;

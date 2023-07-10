import { navConfig } from 'data/navigation';
import { contactsConfig } from 'data/contacts';
// import Navigation from '../Navigation/Navigation';
import Navigation from 'components/Navigation';
import Contacts from 'common/Contacts';
import Logo from 'images/Logo_footer.svg';

import s from './Footer.module.css';
import ScrollUp from 'common/ScrollUp/ScrollUp';
import NavigationFooter from 'components/NavigationFooter/NavigationFooter';

const Footer = () => {
  const logo1 = Logo;
  const date = new Date().getFullYear();

  return (
    <div className={s.footer}>
      <div className={s.logo}>
        <img src={logo1} alt="logo" />
      </div>
      <div>
        <NavigationFooter />
        {/* <Navigation navConfig={navConfig} /> */}
      </div>
      <Contacts contactsConfig={contactsConfig} />
      <div className={s.copyright}>NJORDMARINE &copy; 2019-{date}</div>

      <ScrollUp />
    </div>
  );
};

export default Footer;

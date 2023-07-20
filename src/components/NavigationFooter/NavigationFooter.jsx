import { useTranslation } from 'react-i18next';
import NavItem from './NavItemFooter/NavItemFooter';
import s from './NavigationFooter.module.css';

const NavigationFooter = ({ scrollToTop }) => {
  const { t } = useTranslation();
  return (
    <nav className={s.nav}>
      <div className={s.navBlock}>
        <NavItem
          name={`01. ${t('navigation.nav1')}`}
          path="/home"
          scrollToTop={scrollToTop}
        />
        <NavItem
          name={`02. ${t('navigation.nav2')}`}
          path="/about-company"
          scrollToTop={scrollToTop}
        />
      </div>
      <div className={s.navBlock}>
        <NavItem
          name={`03. ${t('navigation.nav3')}`}
          path="/services"
          scrollToTop={scrollToTop}
        />
        <NavItem
          name={`04. ${t('navigation.nav4')}`}
          path="/spares"
          scrollToTop={scrollToTop}
        />
        <NavItem
          name={`05. ${t('navigation.nav5')}`}
          path="/contacts"
          scrollToTop={scrollToTop}
        />
      </div>
    </nav>
  );
};

export default NavigationFooter;

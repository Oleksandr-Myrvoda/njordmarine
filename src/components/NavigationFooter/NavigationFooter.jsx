import NavItem from './NavItemFooter/NavItemFooter';
import s from './NavigationFooter.module.css';

const NavigationFooter = ({ scrollToTop }) => {
  return (
    <nav className={s.nav}>
      <div className={s.navBlock}>
        <NavItem name="01. Главная" path="/home" scrollToTop={scrollToTop} />
        <NavItem
          name="02. О Компании"
          path="/about-company"
          scrollToTop={scrollToTop}
        />
      </div>
      <div className={s.navBlock}>
        <NavItem name="03. Услуги" path="/services" scrollToTop={scrollToTop} />
        <NavItem name="04. Запчасти" path="/spares" scrollToTop={scrollToTop} />
        <NavItem
          name="05. Контакты"
          path="/contacts"
          scrollToTop={scrollToTop}
        />
      </div>
    </nav>
  );
};

export default NavigationFooter;

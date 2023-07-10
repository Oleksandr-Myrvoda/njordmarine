import NavItem from './NavItemFooter/NavItemFooter';
import s from './NavigationFooter.module.css';

const NavigationFooter = () => {
  return (
    <nav className={s.nav}>
      <div className={s.navBlock}>
        <NavItem name="01. Главная" path="/home" />
        <NavItem name="02. О Компании" path="/about-company" />
      </div>
      <div className={s.navBlock}>
        <NavItem name="03. Услуги" path="/services" />
        <NavItem name="04. Запчасти" path="/spares" />
        <NavItem name="05. Контакты" path="/contacts" />
      </div>
    </nav>
  );
};

export default NavigationFooter;

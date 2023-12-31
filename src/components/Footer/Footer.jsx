import { NavLink } from 'react-router-dom';
import { contactsConfig } from 'data/contacts';
import ScrollUp from 'common/ScrollUp/ScrollUp';
import NavigationFooter from 'components/NavigationFooter';
import logo from 'images/Logo_footer.svg';
import s from './Footer.module.css';

const Footer = ({ loading }) => {
  const date = new Date().getFullYear();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`${s.footer} ${loading ? s.footerStart : s.footerFinish}`}>
      <NavLink to="/" className={s.logo} onClick={scrollToTop}>
        <img src={logo} alt="logo" className={s.logoImg} />
      </NavLink>

      <div>
        <NavigationFooter scrollToTop={scrollToTop} />
      </div>

      <ul className={s.list}>
        {contactsConfig.map(({ imgUrl, text, alt, href }, index) => (
          <li key={index} className={s.item}>
            <img className={s.img} src={imgUrl} alt={alt} />
            <p className={s.text}>
              <a className={s.href} href={href}>
                {text}
              </a>
            </p>
          </li>
        ))}
      </ul>
      <div className={s.copyright}>NJORDMARINE &copy; 2019-{date}</div>

      <ScrollUp />
    </div>
  );
};

export default Footer;

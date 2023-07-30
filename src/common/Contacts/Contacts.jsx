import PropTypes from 'prop-types';

import s from './Contacts.module.css';

const Contacts = ({ contactsConfig, isContactsPage }) => {
  const listStyles = [s.list];
  isContactsPage && listStyles.push(s.contactsPage);

  return (
    <ul className={listStyles.join(' ')}>
      {contactsConfig.map(({ imgUrl, text, alt, href }, index) => (
        <li key={index} className={s.item}>
          <img className={s.img} src={imgUrl} alt={alt} />
          <p className={`${s.text} ${isContactsPage && s.contactsPage}`}>
            <a className={s.href} href={href}>
              {text}
            </a>
          </p>
        </li>
      ))}
    </ul>
  );
};

Contacts.propTypes = {
  contactsConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Contacts;

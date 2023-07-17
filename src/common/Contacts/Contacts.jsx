import PropTypes from 'prop-types';

import s from './Contacts.module.css';

const Contacts = ({ contactsConfig, isContactsPage }) => {
  const listStyles = [s.list];
  isContactsPage && listStyles.push(s.contactsPage);

  return (
    <ul className={listStyles.join(' ')}>
      {contactsConfig.map(({ imgUrl, text, alt }, index) => (
        <li key={index} className={s.item}>
          <img className={s.img} src={imgUrl} alt={alt} />
          <a href={`tel:${text}`}>{text}</a>
        </li>
      ))}
    </ul>
  );
};

Contacts.propTypes = {
  contactsConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Contacts;

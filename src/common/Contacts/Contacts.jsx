import PropTypes from 'prop-types';

import s from './Contacts.module.css';
import Image from 'common/Image/Image';

const Contacts = ({ contactsConfig, isContactsPage, isHeader }) => {
  const listStyles = [s.list];
  isContactsPage && listStyles.push(s.contactsPage);

  return (
    <ul className={listStyles.join(' ')}>
      {contactsConfig.map(({ imgUrl, text, alt, href }, index) => (
        <li key={index} className={s.item}>
          <Image className={s.img} src={imgUrl} alt={alt} />
          <p className={s.text}>
            <a
              className={`${s.href} ${isHeader && s.isHeader} ${
                isContactsPage && s.contactsPage
              }`}
              href={href}
            >
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

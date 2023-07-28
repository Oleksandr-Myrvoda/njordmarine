import { socConfig } from 'data/contacts';
import s from './ContactsBlock.module.css';

const SocialBlock = () => {
  const handleSocLinkClick = linkUrl => window.open(linkUrl, '_blank');

  return (
    <ul className={s.socList}>
      {socConfig.map(({ linkUrl, imgUrl, alt }, index) => (
        <li key={index} className={s.socItem}>
          <button
            className={s.socBtn}
            onClick={() => handleSocLinkClick(linkUrl)}
          >
            <img className={s.img} src={imgUrl} alt={alt} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SocialBlock;

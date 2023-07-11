import PropTypes from 'prop-types';
import s from './FocusList.module.css';

const FocusList = ({ focusConfig }) => {
  return (
    <ul className={s.list}>
      {focusConfig.map(({ imgUrl, title, text, alt }, index) => (
        <li className={s.item} key={index}>
          <img className={s.img} src={imgUrl} alt={alt}></img>
          <p className={s.title}>{title}</p>
          <p className={s.text}>{text}</p>
        </li>
      ))}
    </ul>
  );
};

FocusList.propTypes = {};

export default FocusList;

import s from './ListWithDot.module.css';
import dot from 'images/serv-auto-dotlist.svg';
import PropTypes from 'prop-types';

const ListWithDot = ({ config }) => {
  return (
    <ul className={s.list}>
      {config.map(({ text }, index) => (
        <li key={index} className={s.item}>
          <img src={dot} alt="dot"></img>
          <div className={s.text}>{text}</div>
        </li>
      ))}
    </ul>
  );
};

ListWithDot.propTypes = {};

export default ListWithDot;

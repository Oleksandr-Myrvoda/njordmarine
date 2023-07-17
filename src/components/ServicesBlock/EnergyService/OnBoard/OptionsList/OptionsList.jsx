import PropTypes from 'prop-types';
import dot from 'images/serv-auto-dotlist.svg';
import s from './OptionsList.module.css';

const OptionsList = ({ config }) => { 
  const { title, list } = config;
  return (
    <div className={s.blockWrapper}>
      <div className={s.title}>{title}:</div>
      <ul className={s.list}>
        {list.map(({ text }, index) => (
          <li key={index} className={s.item}>
            <img src={dot} alt="dot"></img>
            <div className={s.text}>{text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// OptionsList.propTypes = {
//   config: PropTypes.arrayOf(
//     PropTypes.shape({
//       imgUrl: PropTypes.string,
//       head: PropTypes.string,
//       text: PropTypes.string,
//       alt: PropTypes.string,
//     }),
//   ).isRequired,
// };

export default OptionsList;

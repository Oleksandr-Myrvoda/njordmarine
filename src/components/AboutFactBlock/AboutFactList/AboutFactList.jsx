import PropTypes from 'prop-types';
import s from './AboutFactList.module.css';

const AboutFactList = ({ aboutFactConfig }) => {
  return (
    <ul className={s.list}>
      {aboutFactConfig.map(({ imgUrl, count, text, alt }, index) => (
        <li key={index} className={s.item}>
          <img className={s.image} src={imgUrl} alt={alt} />
          <p className={s.count}>{count}</p>
          <p className={s.descr}>{text}</p>
        </li>
      ))}
    </ul>
  );
};

AboutFactList.propTypes = {
  aboutFactConfig: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      count: PropTypes.string,
      text: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default AboutFactList;
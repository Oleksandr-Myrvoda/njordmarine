import s from './BtnsDotPagination.module.css';
import PropTypes from 'prop-types';

const BtnsDotPagination = ({
  buttonsList,
  currentIndex,
  setCurrentIndex,
  setPrevIndex,
  setNextIndex,
}) => {
  return (
    <ul className={s.btsDotsBlock}>
      {buttonsList.map(({ id }) => (
        <li key={id} className={s.itemLi}>
          <button
            className={`${
              currentIndex === id ? s.isActiveStyle : s.pagiBtnDot
            }`}
            onClick={() => {
              setCurrentIndex(id);
              setPrevIndex(id - 1);
              setNextIndex(id + 1);
            }}
          ></button>
        </li>
      ))}
    </ul>
  );
};

BtnsDotPagination.propTypes = {};

export default BtnsDotPagination;

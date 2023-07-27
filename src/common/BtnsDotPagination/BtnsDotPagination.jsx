import clsx from 'clsx';
import s from './BtnsDotPagination.module.css';
import PropTypes from 'prop-types';

const BtnsDotPagination = ({ buttonsList, currentPage, setCurrentPage }) => {
  return (
    <ul className={s.btsDotsBlock}>
      {buttonsList.map(({ id }) => (
        <li key={id}>
          <button
            className={`${currentPage === id ? s.isActiveStyle : s.pagiBtnDot}`}
            // className={s.pagiBtnDot}
            // className={clsx(s.pagiBtnDot, isAvtive && s.isActiveStyle)}
            onClick={() => setCurrentPage(id)}
          ></button>
        </li>
      ))}
    </ul>
  );
};

BtnsDotPagination.propTypes = {};

export default BtnsDotPagination;

import s from './AdminPage.module.css';
import PropTypes from 'prop-types';
import AuthBlock from 'components/AuthBlock';

const AdminPage = props => {
  return (
    <div className={s.pageWrapper}>
      <div className={s.taglineWrapper}>
        <h1 className="taglineBig">Admin</h1>
      </div>
      <AuthBlock />
    </div>
  );
};

AdminPage.propTypes = {};

export default AdminPage;

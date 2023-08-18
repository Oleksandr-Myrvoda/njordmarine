import AuthBlock from 'components/AuthBlock';
import s from './AdminPage.module.css';

const AdminPage = () => {
  return (
    <div className={s.pageWrapper}>
      <div className={s.container}>
        <div className={s.taglineWrapper}>
          <h1 className="taglineBig">Admin</h1>
        </div>
        <AuthBlock />
      </div>
    </div>
  );
};

export default AdminPage;

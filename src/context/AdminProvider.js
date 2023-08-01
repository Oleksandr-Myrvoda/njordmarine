import { createContext, useState, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';
import * as api from 'services/api';

const AdminContext = createContext();
const useAdminContext = () => {
  return useContext(AdminContext);
};

const initData = {
  ru: '',
  en: '',
};
// const initData = {
//   ru: 'https://drive.google.com/file/d/1xISlva0ukxmFUSBulM19hrlnO5b_n8uN/view?usp=drive_link',
//   en: 'https://drive.google.com/file/d/1V0qyIzwr2qXe7Y6hNuwLSNY3iO9QOX7v/view?usp=sharing',
// };

const AdminProvider = ({ children }) => {
  const match = useRouteMatch();
  const { isLogin, token } = useAuthContext();
  const [brochureLink, setBrochureLink] = useState(initData);

  const handleLinkChange = e => {
    e.preventDefault();
    const newData = { ...brochureLink, [e.target.name]: e.target.value };
    // const newData = { ...brochureLink, [lang]: e.target.value };

    setBrochureLink(newData);
  };

  const editLink = (id, editedData) => {
    return api
      .editBrochureApi({
        endpoint: match.url,
        item: editedData,
        id,
        token,
      })
      .then(data => {
        setBrochureLink();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <AdminContext.Provider value={{ brochureLink, handleLinkChange, editLink }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider, useAdminContext };

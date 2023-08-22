import * as api from 'services/api';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FileUploader from './ItemsList/FileUploader';
import ItemsList from './ItemsList';
import PropTypes from 'prop-types';
import SendInfo from 'common/SendInfo';
import s from './SparesBlock.module.css';
import { useAuthContext } from 'context/AuthProvider';
import { useRouteMatch } from 'react-router-dom';
import { useSetError } from 'context/ErrorProvider';
import Trail from 'common/Trail/Trail';

const SparesBlock = ({ path, name, linkName, linkPath }) => {
  const { t } = useTranslation();
  const match = useRouteMatch();
  const inputRef = useRef(null);
  const [spares, setSpares] = useState([]);
  const [itemTitle, setItemTitle] = useState({
    ru: '',
    en: '',
  });

  const [isAnimated, setIsAnimated] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const { isLogin, token } = useAuthContext();

  const setError = useSetError();

  // GET =======

  useEffect(() => {
    const fetchSpares = async () => {
      const spares = await api.getData(path);
      setSpares(spares);
    };
    fetchSpares();
  }, [path]);

  // ADD =======

  const addData = async (imgUrl = null, newToken) => {
    try {
      const newSpare = await api.addItemApi(
        path,
        {
          itemTitle,
          imgUrl,
          brends: [],
        },
        newToken ? newToken : token,
      );
      setSpares(prevData => [...prevData, newSpare]);
    } catch (error) {
      setError({ error, cb: token => addData(imgUrl, token) });
    } finally {
      reset();
    }
  };

  // EDIT =======

  const editData = (id, editedData, idToken = token) => {
    return api
      .editItemApi({
        endpoint: match.url,
        item: editedData,
        id,
        token: idToken,
      })
      .then(data => {
        setSpares(prevData =>
          prevData.map(el => (el.id !== data.id ? el : { ...el, ...data })),
        );
      })
      .catch(error => {
        console.log(error.message);
        setError({ error, cb: token => editData(id, editedData, token) });
      });
  };
  // editData(id, {})

  // DELETE =======

  const deleteData = (id, deletedData, idToken = token) => {
    return api
      .deleteItemApi({
        endpoint: match.url,
        item: deletedData,
        id,
        token: idToken,
      })
      .then(data => {
        setSpares(prevSpares => prevSpares.filter(el => el.id !== data.id));
      })
      .catch(error => {
        console.log(error.message);
        setError({ error, cb: token => deleteData(id, deletedData, token) });
      });
  };

  // ===============================================

  const reset = () => {
    setItemTitle({
      ru: '',
      en: '',
    });

    setImgUrl('');
  };
  // ANIMATION ===============================================
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <div className={s.blockWrapper}>
      <Trail open={isAnimated} heightBig={110} heightD={60} heightMob={27}>
        <h2 className={s.headTitle}>{name}</h2>
      </Trail>

      <ItemsList
        items={spares}
        editData={editData}
        deleteData={deleteData}
        setSpares={setSpares}
        setImage={setImgUrl}
      />

      {isLogin && (
        <form className={s.addForm}>
          <input
            className={s.addFormInput}
            ref={inputRef}
            value={itemTitle.ru}
            type="text"
            required
            onChange={e =>
              setItemTitle(prev => ({ ...prev, ru: e.target.value }))
            }
            placeholder={t('common.placeholderRu')}
          />
          <input
            className={s.addFormInput}
            ref={inputRef}
            value={itemTitle.en}
            type="text"
            required
            onChange={e =>
              setItemTitle(prev => ({ ...prev, en: e.target.value }))
            }
            placeholder={t('common.placeholderEn')}
          />

          <FileUploader uploadData={addData} imgUrl={imgUrl} />
        </form>
      )}

      <SendInfo linkName={linkName} linkPath={linkPath} hideLink={false} />
    </div>
  );
};

SparesBlock.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SparesBlock;

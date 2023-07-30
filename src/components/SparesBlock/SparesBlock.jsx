import { useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';
import { useSetError } from 'context/ErrorProvider';

import SendInfo from 'common/SendInfo';
import FileUploader from './ItemsList/FileUploader';
import ItemsList from './ItemsList';
import PropTypes from 'prop-types';
import * as api from 'services/api';
import s from './SparesBlock.module.css';

const SparesBlock = ({ path, name, linkName, linkPath }) => {
  const match = useRouteMatch();
  const inputRef = useRef(null);
  const [spares, setSpares] = useState([]);
  const [itemTitle, setItemTitle] = useState({
    ru: '',
    en: '',
  });

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
    // e.preventDefault();
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
      // console.log(error.messgae);
    } finally {
      reset();
    }
  };

  // const handleAddData = () => {};
  // EDIT =======

  const editData = (id, editedData) => {
    return api
      .editItemApi({ endpoint: match.url, item: editedData, id, token })
      .then(data => {
        setSpares(prevData =>
          prevData.map(el => (el.id !== data.id ? el : { ...el, ...data })),
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // DELETE =======

  const deleteData = (id, deletedData) => {
    return api
      .deleteItemApi({ endpoint: match.url, item: deletedData, id, token })
      .then(data => {
        setSpares(prevSpares => prevSpares.filter(el => el.id !== data.id));
      })
      .catch(err => {
        console.log(err.message);
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

  return (
    <div className={s.blockWrapper}>
      <h2 className={s.headTitle}>{name}</h2>
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
            placeholder="Название на русском"
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
            placeholder="Title in english"
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

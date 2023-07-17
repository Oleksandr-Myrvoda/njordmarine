import { useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

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
  const [itemTitle, setItemTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  // GET =======

  useEffect(() => {
    const fetchSpares = async () => {
      const spares = await api.getData(path);
      setSpares(spares);
    };
    fetchSpares();
  }, [path]);

  // ADD =======

  const addData = async e => {
    e.preventDefault();
    try {
      const newSpare = await api.addItemApi(path, {
        itemTitle,
        imgUrl,
        brends: [],
      });
      setSpares(prevData => [...prevData, newSpare]);
    } catch (error) {
      console.log(error.messgae);
    } finally {
      reset();
    }
  };

  // EDIT =======

  const editData = (id, editedData) => {
    return api
      .editItemApi({ endpoint: match.url, item: editedData, id })
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
      .deleteItemApi({ endpoint: match.url, item: deletedData, id })
      .then(data => {
        setSpares(prevSpares => prevSpares.filter(el => el.id !== data.id));
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // ===============================================

  const reset = () => {
    setItemTitle('');
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

      <form className={s.addForm} onSubmit={addData}>
        <input
          className={s.addFormInput}
          ref={inputRef}
          value={itemTitle}
          type="text"
          required
          onChange={e => setItemTitle(e.target.value)}
          placeholder="itemTitle"
        />

        <FileUploader setImage={setImgUrl} />
      </form>

      <SendInfo linkName={linkName} linkPath={linkPath} hideLink={false} />
    </div>
  );
};

SparesBlock.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SparesBlock;

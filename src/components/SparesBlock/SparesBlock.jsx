import { useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import SendInfo from 'common/SendInfo';
import AddItemForm from 'common/AddItemForm';
import ItemsList from './ItemsList';
import * as api from 'services/api';
import s from './SparesBlock.module.css';

const SparesBlock = ({ path, name }) => {
  const match = useRouteMatch();
  const inputRef = useRef(null);
  const [spares, setSpares] = useState([]);
  const [itemTitle, setItemTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  // const addBrend = ({ itemId, brendId, newBrend }) => {
  //   setSpares(prev =>
  //     prev.map(spare => {
  //       if (spare.id !== itemId) return spare;

  //       const newBrends = spare.brends.map(brend => {
  //         if (brend.id !== brendId) return brend;
  //         return { ...brend, brend: newBrend };
  //       });
  //       return { ...spare, brends: newBrends };
  //     }),
  //   );
  // };

  // const editBrend = ({ itemId, brendId, newBrend }) => {
  //   setSpares(prev =>
  //     prev.map(spare => {
  //       if (spare.id !== itemId) return spare;

  //       const newBrends = spare.brends.map(brend => {
  //         if (brend.id !== brendId) return brend;
  //         return { ...brend, brend: newBrend };
  //       });
  //       return { ...spare, brends: newBrends };
  //     }),
  //   );
  // };

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
        // editBrend={editBrend}
        setSpares={setSpares}
      />

      {/* <AddItemForm onSubmit={addData} /> */}

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
        <input
          className={s.addFormInput}
          ref={inputRef}
          value={imgUrl}
          type="text"
          required
          onChange={e => setImgUrl(e.target.value)}
          placeholder="imgUrl"
        />

        <button className={s.addFormButton} type="submit" text="Add">
          Add
        </button>
      </form>

      <SendInfo linkName="Палуба" linkPath="/" hideLink={false} />
    </div>
  );
};

SparesBlock.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SparesBlock;

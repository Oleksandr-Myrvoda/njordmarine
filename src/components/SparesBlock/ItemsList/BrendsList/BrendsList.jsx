import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import BigButton from 'common/BigButton';
import CardWithMenu from 'common/CardWithMenu';
import PropTypes from 'prop-types';
import { addBrendApi } from 'services/api';
import * as api from 'services/api';
import s from './BrendsList.module.css';
import BrendItem from './BrendItem/BrendItem';

const BrendsList = ({
  brends,
  onClose,
  // editBrend: editBrendState,
  setSpares,
}) => {
  const match = useRouteMatch();
  // const [brendList, setBrendList] = useState([]);
  // const [brendsList, setBrendsList] = useState(brends);
  const [newBrend, setNewBrend] = useState('');

  // useEffect(() => {
  //   setBrendsList(brends);
  // }, [brends]);

  // GET =======
  // console.log('path', path);
  // useEffect(() => {
  //   const fetchBrends = async () => {
  //     const brendsApi = await api.getData(path);
  //     setBrendList(brendsApi);
  //   };
  //   fetchBrends();
  // }, [path]);

  // ADD ===============================================

  const addBrendState = ({ itemId, newBrend }) => {
    setSpares(prev =>
      prev.map(spare => {
        if (spare.id !== itemId) return spare;

        const newBrends = [...spare.brends, newBrend];
        return { ...spare, brends: newBrends };
      }),
    );
  };

  const addBrend = async e => {
    e.preventDefault();
    try {
      const newBrendAdd = await api.addBrendApi({
        endpoint: match.url,
        brend: newBrend,
      });
      addBrendState({
        itemId: match.params.itemId,
        newBrend: newBrendAdd,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      reset();
    }
  };

  // EDIT =======

  const editBrendState = ({ itemId, brendId, newBrend }) => {
    setSpares(prev =>
      prev.map(spare => {
        if (spare.id !== itemId) return spare;

        const newBrends = spare.brends.map(brend => {
          if (brend.id !== brendId) return brend;
          return { ...brend, brend: newBrend };
        });
        return { ...spare, brends: newBrends };
      }),
    );
  };

  const editBrend = (id, editedData) => {
    return (
      api
        .editBrendApi({ endpoint: match.url, item: editedData, id })
        .then(brend =>
          editBrendState({
            itemId: match.params.itemId,
            brendId: brend.id,
            newBrend: brend.brend,
          }),
        )
        // .then(data => {
        //   setBrendsList(prevData =>
        //     prevData.map(el => (el.id !== data.id ? el : { ...el, ...data })),
        //   );
        // })
        .catch(err => {
          console.log(err.message);
        })
    );
  };

  // DELETE =======

  const deleteBrendState = ({ itemId, brendId }) => {
    setSpares(prev =>
      prev.map(spare => {
        if (spare.id !== itemId) return spare;

        const newBrends = spare.brends.filter(el => el.id !== brendId);
        return { ...spare, brends: newBrends };
      }),
    );
  };

  const deleteBrend = id => {
    return api
      .deleteBrendApi({ endpoint: match.url, id })
      .then(() =>
        deleteBrendState({ itemId: match.params.itemId, brendId: id }),
      )
      .catch(err => {
        console.log(err.message);
      });
  };
  // ===============================================
  const reset = () => {
    setNewBrend('');
  };
  // console.log('brendsList', brendsList);
  return (
    <div className={s.listWrapper}>
      <ul className={s.list}>
        {brends.map(({ id, brend }) => (
          <BrendItem
            key={id}
            id={id}
            brend={brend}
            editBrend={editBrend}
            deleteBrend={deleteBrend}
          />
        ))}
      </ul>

      <form onSubmit={addBrend} className={s.addForm}>
        <input
          className={s.input}
          type="text"
          value={newBrend}
          onChange={e => setNewBrend(e.target.value)}
        />
        <button type="submit" className={s.button} text="Add">
          Add
        </button>
      </form>
      <BigButton onClick={onClose} text="Закрыть" />
    </div>
  );
};

BrendsList.propTypes = {
  brends: PropTypes.array.isRequired,
};

export default BrendsList;

import { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import BigButton from 'common/BigButton';
import BrendItem from './BrendItem/BrendItem';
import * as api from 'services/api';

import s from './BrendsList.module.css';

import { useAuthContext } from 'services/AuthProvider';

const BrendsList = ({ brends = [], onClose, setSpares }) => {
  const match = useRouteMatch();
  const [newBrend, setNewBrend] = useState('');
  const { isLogin, token } = useAuthContext();

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
        token,
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

  // EDIT ===============================================

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
    return api
      .editBrendApi({ endpoint: match.url, item: editedData, id, token })
      .then(brend =>
        editBrendState({
          itemId: match.params.itemId,
          brendId: brend.id,
          newBrend: brend.brend,
        }),
      )
      .catch(err => {
        console.log(err.message);
      });
  };

  // DELETE ===============================================

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
      .deleteBrendApi({ endpoint: match.url, id, token })
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

      {isLogin && (
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
      )}
      <BigButton onClick={onClose} text="Закрыть" />
    </div>
  );
};

BrendsList.propTypes = {
  brends: PropTypes.array.isRequired,
};

export default BrendsList;

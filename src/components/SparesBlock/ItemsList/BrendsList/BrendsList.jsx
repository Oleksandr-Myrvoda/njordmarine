import { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthContext } from 'context/AuthProvider';
import { useSetError } from 'context/ErrorProvider';

import BigButton from 'common/BigButton';
import BrendItem from './BrendItem/BrendItem';
import * as api from 'services/api';

import s from './BrendsList.module.css';

const BrendsList = ({ brends = [], onClose, setSpares }) => {
  const match = useRouteMatch();
  const [newBrend, setNewBrend] = useState({
    ru: '',
    en: '',
  });

  const { isLogin, token } = useAuthContext();
  const setError = useSetError();

  // ADD ===============================================

  const addBrendToState = ({ itemId, newBrend }) => {
    setSpares(prev =>
      prev.map(spare => {
        if (spare.id !== itemId) return spare;

        const newBrends = [...spare.brends, newBrend];
        return { ...spare, brends: newBrends };
      }),
    );
  };

  const addBrend = async (idToken = token) => {
    try {
      const newBrendAdd = await api.addBrendApi({
        endpoint: match.url,
        brend: newBrend,
        token: idToken,
      });

      addBrendToState({
        itemId: match.params.itemId,
        newBrend: newBrendAdd,
      });
    } catch (error) {
      setError({ error, cb: token => addBrend(token) });
    } finally {
      reset();
    }
  };

  const handleAddBrend = async e => {
    e.preventDefault();
    addBrend();
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

  const editBrend = (id, editedData, idToken = token) => {
    return api
      .editBrendApi({
        endpoint: match.url,
        item: {
          en: editedData.en,
          ru: editedData.ru,
        },
        id,
        token: idToken,
      })
      .then(brend =>
        editBrendState({
          itemId: match.params.itemId,
          brendId: brend.id,
          newBrend: brend,
        }),
      )
      .catch(error => {
        setError({ error, cb: token => editBrend(id, editedData, token) });
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
    setNewBrend({
      ru: '',
      en: '',
    });
  };

  const handleBrendChenge = e =>
    setNewBrend(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className={s.listWrapper}>
      <ul className={s.list}>
        {brends.map(el => (
          <BrendItem
            key={el.id}
            id={el.id}
            brend={el}
            editBrend={editBrend}
            deleteBrend={deleteBrend}
          />
        ))}
      </ul>

      {isLogin && (
        <form onSubmit={handleAddBrend} className={s.addForm}>
          <input
            className={s.input}
            type="text"
            name="ru"
            value={newBrend.ru}
            onChange={handleBrendChenge}
            placeholder="На русском"
            autocomplete="off"
          />

          <input
            className={s.input}
            type="text"
            name="en"
            value={newBrend.en}
            onChange={handleBrendChenge}
            placeholder="In english"
            autocomplete="off"
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

import * as api from 'services/api';
import { useTranslation } from 'react-i18next';
import BigButton from 'common/BigButton';
import BrendItem from './BrendItem/BrendItem';
import PropTypes from 'prop-types';
import s from './BrendsList.module.css';
import { useAuthContext } from 'context/AuthProvider';
import { useRouteMatch } from 'react-router-dom';
import { useSetError } from 'context/ErrorProvider';
import { useState } from 'react';

const BrendsList = ({ brends = [], onClose, setSpares }) => {
  const { t } = useTranslation();
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

  const editBrendToState = ({ itemId, brendId, newBrend }) => {
    setSpares(prev =>
      prev.map(spare => {
        if (spare.id !== itemId) return spare;

        const newBrends = spare.brends.map(brend => {
          if (brend.id !== brendId) return brend;
          return { ...brend, ...newBrend };
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
        editBrendToState({
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

  const deleteBrendFromState = ({ itemId, brendId }) => {
    setSpares(prev =>
      prev.map(spare => {
        if (spare.id !== itemId) return spare;

        const newBrends = spare.brends.filter(el => el.id !== brendId);
        return { ...spare, brends: newBrends };
      }),
    );
  };

  const deleteBrend = (id, idToken = token) => {
    return api
      .deleteBrendApi({ endpoint: match.url, id, token: idToken })
      .then(() =>
        deleteBrendFromState({ itemId: match.params.itemId, brendId: id }),
      )
      .catch(error => {
        setError({ error, cb: token => deleteBrend(id, token) });
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
            placeholder={t('common.placeholderRu')}
            autoComplete="off"
          />

          <input
            className={s.input}
            type="text"
            name="en"
            value={newBrend.en}
            onChange={handleBrendChenge}
            placeholder={t('common.placeholderEn')}
            autoComplete="off"
          />

          <button type="submit" className={s.button} text="Add">
            Add
          </button>
        </form>
      )}
      <BigButton onClick={onClose} text={t('common.closeBtn')} />
    </div>
  );
};

BrendsList.propTypes = {
  brends: PropTypes.array.isRequired,
};

export default BrendsList;

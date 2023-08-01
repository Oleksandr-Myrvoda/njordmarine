import { useState, useRef } from 'react';
import useOutsideClickDetector from 'hooks/useOutsideClickDetector';
import PropTypes from 'prop-types';
import { useAuthContext } from 'context/AuthProvider';
import { useSetError } from 'context/ErrorProvider';
import { useLangContext } from 'context/LangProvider';
import CardWithMenu from 'common/CardWithMenu';
import s from './BrendItem.module.css';

const BrendItem = ({ brend, id, editBrend, deleteBrend }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const { isLogin } = useAuthContext();
  const { lang } = useLangContext();
  const setError = useSetError();

  const cardRef = useRef(null);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setEditedData(false);
  };
  useOutsideClickDetector(cardRef, closeMenu, isMenuOpen);

  const handleEditData = () => {
    !editedData
      ? setEditedData(brend)
      : editBrend(id, editedData)
          .catch(error => {
            console.log('error', error);
            setError({ error, cb: () => editBrend(id, editedData) });
          })
          .finally(() => setEditedData(null));
  };

  const handleDeleteData = () => {
    deleteBrend(id);
  };

  const handleEditBrend = e => {
    setEditedData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <li ref={cardRef} key={id} className={`${s.item} ${isLogin && s.isLogin}`}>
      {/* ================= */}

      {!editedData ? (
        <div
          className={s.brendItem}
          onClick={e => {
            if (e.target !== e.currentTarget) return;
            setIsMenuOpen(prevState => !prevState);
          }}
        >
          {brend[lang]}
        </div>
      ) : (
        <div className={s.formInputBlock}>
          <div className={s.formInputWrapper}>
            <input
              className={s.formInput}
              type="text"
              value={editedData.ru}
              name="ru"
              onChange={handleEditBrend}
              autoComplete="off"
              placeholder="На русском"
            />
            <input
              className={s.formInput}
              type="text"
              value={editedData.en}
              name="en"
              onChange={handleEditBrend}
              autoComplete="off"
              placeholder="In english"
            />
          </div>
        </div>
      )}

      {/* ================= */}
      {isLogin && isMenuOpen && (
        <CardWithMenu
          onEdit={handleEditData}
          onDelete={handleDeleteData}
          isEditing={editedData}
        />
      )}
    </li>
  );
};

BrendItem.propTypes = {};

export default BrendItem;

import { useState, useRef } from 'react';
import useOutsideClickDetector from 'hooks/useOutsideClickDetector';
import PropTypes from 'prop-types';
import CardWithMenu from 'common/CardWithMenu';
import s from './BrendItem.module.css';

const BrendItem = ({ brend, id, editBrend, deleteBrend }) => {
  const [isAuth] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    brend: null, // brend
  });

  const cardRef = useRef(null);
  const toggleMenu = () => setIsMenuOpen(prevState => !prevState);
  useOutsideClickDetector(cardRef, toggleMenu, isMenuOpen);

  const handleEditData = () => {
    !editedData.brend
      ? setEditedData({ brend })
      : editBrend(id, editedData).finally(() => setEditedData({ brend: null }));
  };

  const handleDeleteData = () => {
    // console.log('brend id', id);
    deleteBrend(id);
  };

  return (
    <li
      ref={cardRef}
      key={id}
      className={s.item}
      onClick={e => {
        if (e.target !== e.currentTarget) return;
        setIsMenuOpen(prevState => !prevState);
      }}
    >
      {/* ================= */}

      {!editedData.brend ? (
        <> {brend}</>
      ) : (
        <input
          className={s.formInput}
          type="text"
          value={editedData.brend}
          name="brend"
          onChange={e =>
            setEditedData(prev => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
      )}

      {/* ================= */}
      {isAuth && isMenuOpen && (
        <CardWithMenu
          // isEditing={editedData.brend}
          onEdit={handleEditData}
          onDelete={handleDeleteData}
        />
      )}
    </li>
  );
};

BrendItem.propTypes = {};

export default BrendItem;

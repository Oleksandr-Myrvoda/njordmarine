import PropTypes from 'prop-types';
import deleteIcon from 'images/delete.svg';
import editIcon from 'images/edit.svg';
import s from './CardWithMenu.module.css';
import { useState } from 'react';

const CardWithMenu = ({ text, onEdit, onDelete, isEditing }) => {
  const handleEdit = () => {
    onEdit();
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className={s.cardStyles}>
      <button
        className={s.button}
        type="button"
        onClick={handleEdit}
        aria-label="Menu"
      >
        {/* <img className={s.icon} src={editIcon} alt="Edit" /> */}
        Edit
      </button>

      <button
        className={s.button}
        type="button"
        onClick={handleDelete}
        aria-label="Menu"
      >
        Delete
      </button>
    </div>
  );
};

CardWithMenu.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardWithMenu;

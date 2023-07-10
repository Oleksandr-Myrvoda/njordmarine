import PropTypes from 'prop-types';
import { useState, useRef } from 'react';

import s from './CardWithMenu.module.css';

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
        // className={isEditing ? { backgroundColor: 'green' } : {button}}
        className={s.button}
        type="button"
        onClick={handleEdit}
        aria-label="Menu"
      >
        {/* <p style={isEditing ? { backgroundColor: 'green' } : {}}>Edit</p> */}
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

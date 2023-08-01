import PropTypes from 'prop-types';
import s from './CardWithMenu.module.css';

const CardWithMenu = ({ onEdit, onDelete, isEditing }) => {
  const handleEdit = () => {
    onEdit();
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className={s.cardStyles}>
      <button
        className={`${s.button} ${isEditing && s.edited}`}
        type="button"
        onClick={handleEdit}
        aria-label="Menu"
      >
        {isEditing ? 'Ok' : 'Edit'}
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

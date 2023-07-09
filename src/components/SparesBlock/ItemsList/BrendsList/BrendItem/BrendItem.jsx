import { useState } from 'react';
import PropTypes from 'prop-types';
import CardWithMenu from 'common/CardWithMenu';
import s from './BrendItem.module.css';

const BrendItem = ({ brend, id, editBrend, deleteBrend }) => {
  const [isAuth] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editedBrend, setEditedBrend] = useState({
    brend: null, // url
  });

  const handleEditData = () => {
    !editedBrend.brend
      ? setEditedBrend({ brend })
      : editBrend(id, editedBrend).finally(() =>
          setEditedBrend({ brend: null }),
        );
  };

  const handleDeleteData = () => {
    console.log('brend', id);
    deleteBrend(id);
  };

  return (
    <li
      key={id}
      className={s.item}
      onClick={e => {
        if (e.target !== e.currentTarget) return;
        setIsMenuOpen(prevState => !prevState);
      }}
    >
      {brend}
      {isAuth && isMenuOpen && (
        <CardWithMenu
          // isEditing={editedData.itemTitle}
          onEdit={handleEditData}
          onDelete={handleDeleteData}
        />
        // <>
        //   <button type="button">Remove</button>
        //   <button type="button">Edit</button>
        // </>
      )}
    </li>
  );
};

BrendItem.propTypes = {};

export default BrendItem;

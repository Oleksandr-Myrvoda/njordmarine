import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import s from './AddItemForm.module.css';

const AddItemForm = ({ addData }) => {
  const inputRef = useRef(null);
  const [itemTitle, setItemTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  console.log('itemTitle', itemTitle);
  return (
    <form onSubmit={addData}>
      <input
        ref={inputRef}
        value={itemTitle}
        type="text"
        required
        onChange={e => setItemTitle(e.target.value)}
        placeholder="itemTitle"
      />
      <input
        ref={inputRef}
        value={imgUrl}
        type="text"
        required
        onChange={e => setImgUrl(e.target.value)}
        placeholder="imgUrl"
      />

      <button type="submit" text="Добавить">
        Добавить
      </button>
    </form>
  );
};

AddItemForm.propTypes = {};

export default AddItemForm;

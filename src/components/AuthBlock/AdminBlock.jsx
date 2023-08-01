import { useState, useEffect } from 'react';
import { useAdminContext } from 'context/AdminProvider';
import s from './AuthBlock.module.css';

const AdminBlock = () => {
  const { brochureLink, handleLinkChange, editLink } = useAdminContext();

  return (
    <div>
      AdminBlock
      <form onSubmit={handleLinkChange} className={s.addForm}>
        <p>Редактирование ссылки на брошюру</p>
        <label>
          <p>Ссылка на русском</p>
          <input
            className={s.addFormInput}
            type="text"
            name="ru"
            defaultValue={brochureLink.ru}
            // value={brochureLink.ru}
            // onChange={e => handleLinkChange(e, 'ru')}
            placeholder="Ссылка на русском"
          />
        </label>

        <label>
          <p>Link in english</p>
          <input
            className={s.addFormInput}
            type="text"
            name="en"
            defaultValue={brochureLink.en}
            // value={brochureLink.en}
            // onChange={e => handleLinkChange(e, 'en')}
            placeholder="Link in english"
          />
        </label>
        <button onClick={editLink} type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default AdminBlock;

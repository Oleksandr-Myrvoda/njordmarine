import {
  addBrochureApi,
  addTermsApi,
  editBrochureApi,
  getBrochureApi,
} from 'services/api';
import { useEffect, useState } from 'react';

import s from './AuthBlock.module.css';
import { useSetError } from 'context/ErrorProvider';

const AdminBlock = ({ token }) => {
  const setError = useSetError();

  const [refs, setRefs] = useState({ en: '', ru: '', id: null });
  const [termRefs, setTermRefs] = useState({ en: '', ru: '', id: null });

  const handleChange = e => {
    const { name, value } = e.target;
    setRefs(p => ({ ...p, [name]: value }));
  };

  const handleTermChange = e => {
    const { name, value } = e.target;
    setTermRefs(p => ({ ...p, [name]: value }));
  };

  const handleAddRefs = (idToken = token) => {
    addBrochureApi(refs, idToken)
      .then(refs => setRefs(refs))
      .catch(error => {
        setError({ error, cb: token => handleAddRefs(token) });
      });
  };

  const handleAddTermRefs = (idToken = token) => {
    const { id, ...rest } = termRefs;
    addTermsApi(rest, idToken)
      .then(refs => setTermRefs(refs))
      .catch(error => {
        setError({ error, cb: token => handleAddTermRefs(token) });
      });
  };

  const editRefs = (idToken = token) => {
    const { id, ...rest } = refs;
    editBrochureApi({ refs: rest, id, token: idToken })
      .then(refs => setRefs(p => ({ ...p, ...refs })))
      .catch(error => {
        setError({ error, cb: token => editRefs(token) });
      });
  };

  const handleEditRefs = e => {
    e.preventDefault();
    editRefs();
  };

  useEffect(() => {
    getBrochureApi()
      .then(refs => {
        setRefs(refs);
      })
      .catch(err => console.log('setOtherError(error.response.data)'));
  }, []);

  return (
    <div>
      AdminBlock
      <form onSubmit={handleEditRefs} className={s.addForm}>
        <p>Редактирование ссылки на брошюру</p>
        <label>
          <p>Ссылка на русском</p>
          <input
            className={s.addFormInput}
            type="text"
            name="ru"
            defaultValue={refs.ru}
            onChange={handleChange}
            placeholder="Ссылка на русском"
          />
        </label>

        <label>
          <p>Link in english</p>
          <input
            className={s.addFormInput}
            type="text"
            name="en"
            defaultValue={refs.en}
            onChange={handleChange}
            placeholder="Link in english"
          />
        </label>
        <button type="submit">Update</button>
        <button onClick={() => handleAddRefs()} type="button">
          Post
        </button>
      </form>
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={null} className={s.addForm}>
        <p>Редактирование ссылки на TERMS</p>
        <label>
          <p>Ссылка на русском</p>
          <input
            className={s.addFormInput}
            type="text"
            name="ru"
            defaultValue={refs.ru}
            onChange={handleTermChange}
            placeholder="Ссылка на русском"
          />
        </label>

        <label>
          <p>Link in english</p>
          <input
            className={s.addFormInput}
            type="text"
            name="en"
            defaultValue={refs.en}
            onChange={handleTermChange}
            placeholder="Link in english"
          />
        </label>
        <button type="submit">Update</button>
        <button onClick={() => handleAddTermRefs()} type="button">
          Post
        </button>
      </form>
    </div>
  );
};

export default AdminBlock;

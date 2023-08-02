import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  addBrochureApi,
  addTermsApi,
  editBrochureApi,
  getBrochureApi,
  editTermsApi,
  getTermsApi,
} from 'services/api';
import { Link } from 'react-router-dom';
import { useSetError, useSetOtherError } from 'context/ErrorProvider';
import { toast } from 'react-toastify';
import BigButton from 'common/BigButton';
import Modal from 'common/Modal';
import s from './AuthBlock.module.css';

const AdminBlock = ({ token }) => {
  const { t } = useTranslation();
  const setError = useSetError();
  const setOtherError = useSetOtherError();
  const [isBrochureModalOpen, setBrochureIsModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsIsModalOpen] = useState(false);

  const [refs, setRefs] = useState({ en: '', ru: '', id: null });
  const [termRefs, setTermRefs] = useState({ en: '', ru: '', id: null });
  // console.log('refs', refs);
  // console.log('termRefs', termRefs);
  const handleChange = e => {
    const { name, value } = e.target;
    setRefs(p => ({ ...p, [name]: value }));
  };

  const handleTermChange = e => {
    const { name, value } = e.target;
    setTermRefs(p => ({ ...p, [name]: value }));
  };

  // const handleAddRefs = (idToken = token) => {
  //   addBrochureApi(refs, idToken)
  //     .then(refs => setRefs(refs))
  //     .catch(error => {
  //       setError({ error, cb: token => handleAddRefs(token) });
  //     });
  // };

  // const handleAddTermRefs = (idToken = token) => {
  //   const { id, ...rest } = termRefs;
  //   addTermsApi(rest, idToken)
  //     .then(refs => setTermRefs(refs))
  //     .catch(error => {
  //       setError({ error, cb: token => handleAddTermRefs(token) });
  //     });
  // };

  // BROCHURE
  const editRefs = (idToken = token) => {
    const { id, ...rest } = refs;
    editBrochureApi({ refs: rest, id, token: idToken })
      .then(refs => setRefs(p => ({ ...p, ...refs })))
      .catch(error => {
        setError({ error, cb: token => editRefs(token) });
        setOtherError(error.response.data);
      });
  };

  const handleEditRefs = e => {
    e.preventDefault();
    editRefs();
    closeModal();
    toast.success('Upload succsess');
  };

  useEffect(() => {
    getBrochureApi()
      .then(refs => {
        setRefs(refs);
      })
      .catch(error => {
        // console.log('setOtherError(error.response.data)');
        setOtherError(error.response.data);
      });
  }, [setOtherError]);

  // TERMS

  const editTermsRefs = (idToken = token) => {
    const { id, ...rest } = termRefs;
    editTermsApi({ termRefs: rest, id, token: idToken })
      .then(termRefs => setTermRefs(p => ({ ...p, ...termRefs })))
      .catch(error => {
        setError({ error, cb: token => editRefs(token) });
      });
  };

  const handleEditTermsRefs = e => {
    e.preventDefault();
    editTermsRefs();
    closeModal();
    toast.success('Upload succsess');
  };

  useEffect(() => {
    getTermsApi()
      .then(termRefs => {
        setTermRefs(termRefs);
      })
      .catch(error => {
        // console.log('setOtherError(error.response.data)');
        setOtherError(error.response.data);
      });
  }, [setOtherError]);

  // MODAL
  const openBrochureModal = () => setBrochureIsModalOpen(true);
  const openTermsModal = () => setTermsIsModalOpen(true);

  const closeModal = () => {
    setBrochureIsModalOpen(false);
    setTermsIsModalOpen(false);
  };

  return (
    <div className={s.adminBlock}>
      <h2 className="tagline">{t('admin.edit')}</h2>

      <div className={s.buttonsBlock}>
        <Link to="/spares">
          <BigButton text={t('admin.button')} />
        </Link>
        <BigButton
          onClick={openBrochureModal}
          text={t('admin.brochureTitle')}
        />
        {isBrochureModalOpen && (
          <Modal title={t('admin.brochureTitle')} onClose={closeModal}>
            <form onSubmit={handleEditRefs} className={s.editForm}>
              <label>
                <p>{t('common.placeholderRu')}</p>
                <input
                  className={s.editFormInput}
                  type="text"
                  name="ru"
                  defaultValue={refs.ru}
                  onChange={handleChange}
                  placeholder={t('common.placeholderRu')}
                />
              </label>
              <label>
                <p>{t('common.placeholderEn')}</p>
                <input
                  className={s.editFormInput}
                  type="text"
                  name="en"
                  defaultValue={refs.en}
                  onChange={handleChange}
                  placeholder={t('common.placeholderEn')}
                />
              </label>
              <BigButton
                // onClick={openBrochureModal}
                type="submit"
                text="Update"
              />
              {/* <button type="submit">Update</button> */}
              <p>{t('admin.instroction')}:</p>
              <ul>
                <li>
                  {t('admin.li1.1')}{' '}
                  <a
                    href="https://drive.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Drive
                  </a>{' '}
                  {t('admin.li1.2')}
                </li>
                <li>{t('admin.li2')}</li>
                <li>{t('admin.li3')}</li>
                <li>{t('admin.li4')}</li>
                <li>{t('admin.li5')}</li>
                <li>{t('admin.li6')}</li>
              </ul>
              {/* <button onClick={() => handleAddRefs()} type="button">
              Post
            </button> */}
            </form>
          </Modal>
        )}
        <BigButton onClick={openTermsModal} text={t('admin.termsTitle')} />
        {isTermsModalOpen && (
          <Modal title={t('admin.termsTitle')} onClose={closeModal}>
            <form onSubmit={handleEditTermsRefs} className={s.editForm}>
              <label>
                <p>{t('common.placeholderRu')}</p>
                <input
                  className={s.editFormInput}
                  type="text"
                  name="ru"
                  defaultValue={termRefs.ru}
                  onChange={handleTermChange}
                  placeholder="{t('common.placeholderRu')}"
                />
              </label>

              <label>
                <p>{t('common.placeholderEn')}</p>
                <input
                  className={s.editFormInput}
                  type="text"
                  name="en"
                  defaultValue={termRefs.en}
                  onChange={handleTermChange}
                  placeholder="{t('common.placeholderEn')}"
                />
              </label>
              <BigButton
                // onClick={openBrochureModal}
                type="submit"
                text="Update"
              />
              {/* <button type="submit">Update</button> */}
              {/* <button onClick={() => handleAddTermRefs()} type="button">
              Post
            </button> */}
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AdminBlock;

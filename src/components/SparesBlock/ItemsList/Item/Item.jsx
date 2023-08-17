import { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'context/AuthProvider';
import { useLangContext } from 'context/LangProvider';
import CardWithMenu from 'common/CardWithMenu';
import PropTypes from 'prop-types';

import FileUploader from '../FileUploader';
import s from './Item.module.css';
import Modal from 'common/Modal/Modal';

const Item = ({
  itemTitle,
  imgUrl,
  id,
  editData,
  deleteData,
  setImage,
  setModalData,
  brends,
}) => {
  const [editedData, setEditedData] = useState(null); //{ imgUrl, itemTitle }
  const { isLogin } = useAuthContext();
  const { lang } = useLangContext();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const match = useRouteMatch();
  const history = useHistory();

  const openModal = () => {
    setModalData({ brends, itemTitle, id });
    history.push({ pathname: `${match.url}/${id}` });
  };

  // const openEditSets = () => setEditedData({ imgUrl, itemTitle });

  // MODAl
  const openEditModal = () => {
    setIsModalOpen(true);
    setEditedData({ imgUrl, itemTitle });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedData(null);
  };
  // ========================
  const handleEditData = imgUrl => {
    const { itemTitle } = editedData;
    let data = null;
    if (imgUrl && itemTitle) {
      data = { itemTitle, imgUrl };
    } else if (imgUrl) {
      data = { imgUrl };
    } else if (itemTitle) {
      data = { itemTitle };
    } else return;

    editData(id, data);
    // .finally(() => setEditedData(null));
  };

  const handleDeleteData = () => {
    deleteData(id);
  };

  const handleEditTitle = e =>
    setEditedData(prev => ({
      ...prev,
      itemTitle: {
        ...prev.itemTitle,
        [e.target.name]: e.target.value,
      },
    }));

  return (
    <li key={id}>
      <button onClick={openModal} className={s.button}>
        <div className={s.item}>
          <div className={s.imgWrapper}>
            <img className={s.img} src={imgUrl} alt={itemTitle}></img>
          </div>

          <div className={s.itemMenu}>
            <p className={s.title}> {itemTitle[lang]}</p>

            <div className={s.watchBrends}>{t('spares.brandsBtn')}</div>
          </div>
        </div>
      </button>

      {isModalOpen && (
        <Modal onClose={closeModal} title={itemTitle[lang]}>
          <div className={s.editedModalItem}>
            <div className={s.imgWrapper}>
              <FileUploader
                setImage={setImage}
                editData={editData}
                uploadData={handleEditData}
              />
            </div>

            <div className={s.itemMenu}>
              <input
                className={s.editInput}
                type="text"
                value={editedData.itemTitle.ru}
                name="ru"
                onChange={handleEditTitle}
                placeholder={t('common.placeholderRu')}
                autoComplete="off"
              />
              <input
                className={s.editInput}
                type="text"
                value={editedData.itemTitle.en}
                name="en"
                onChange={handleEditTitle}
                placeholder={t('common.placeholderEn')}
                autoComplete="off"
              />
            </div>
          </div>
        </Modal>
      )}

      {isLogin && (
        <div className={s.cardWithMenu}>
          <CardWithMenu onEdit={openEditModal} onDelete={handleDeleteData} />
        </div>
      )}
    </li>
  );
};

Item.propTypes = {};

export default Item;

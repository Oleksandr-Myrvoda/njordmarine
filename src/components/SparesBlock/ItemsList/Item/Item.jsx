import { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import CardWithMenu from 'common/CardWithMenu';
import PropTypes from 'prop-types';
import s from './Item.module.css';
import BrendsList from '../BrendsList/BrendsList';

const Item = ({ itemTitle, imgUrl, id, editData, deleteData }) => {
  const [isAuth] = useState(true);
  const [editedData, setEditedData] = useState({
    imgUrl: null, // url
    itemTitle: null, // title
  });
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const match = useRouteMatch();
  const history = useHistory();
  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);
  const openModal = () => history.push({ pathname: `${match.url}/${id}` });

  const handleEditData = () => {
    !editedData.imgUrl
      ? setEditedData({ imgUrl, itemTitle })
      : editData(id, editedData).finally(() =>
          setEditedData({ itemTitle: null, imgUrl: null }),
        );
  };
  const handleDeleteData = () => {
    deleteData(id);
  };

  return (
    <li key={id} className={s.item}>
      <div className={s.imgWrapper}>
        {!editedData.imgUrl ? (
          <img className={s.img} src={imgUrl} alt={itemTitle}></img>
        ) : (
          <input
            type="text"
            value={editedData.imgUrl}
            name="imgUrl"
            onChange={e =>
              setEditedData(p => ({ ...p, [e.target.name]: e.target.value }))
            }
          />
        )}
      </div>
      <div className={s.itemMenu}>
        {!editedData.itemTitle ? (
          <p className={s.title}> {itemTitle}</p>
        ) : (
          <input
            type="text"
            value={editedData.itemTitle}
            name="itemTitle"
            onChange={e =>
              setEditedData(prev => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        )}
        <button onClick={openModal} className={s.button}>
          Смотреть бренды
        </button>
      </div>

      {isAuth && (
        <CardWithMenu
          isEditing={editedData.itemTitle}
          onEdit={handleEditData}
          onDelete={handleDeleteData}
        />
      )}

      {/* {isModalOpen && (
          <Modal title={itemTitle} onClose={closeModal}>
            <BrendsList brends={brends} onClose={closeModal} />
          </Modal>
        )} */}
    </li>
  );
};

Item.propTypes = {};

export default Item;

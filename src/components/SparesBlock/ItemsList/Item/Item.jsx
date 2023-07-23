import { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import CardWithMenu from 'common/CardWithMenu';
import PropTypes from 'prop-types';
import s from './Item.module.css';
import BrendsList from '../BrendsList/BrendsList';
import FileUploader from '../FileUploader';
import { useAuthContext } from 'services/AuthProvider';

const Item = ({ itemTitle, imgUrl, id, editData, deleteData, setImage }) => {
  const [editedData, setEditedData] = useState(null); //{ imgUrl, itemTitle }
  // const [editedData, setEditedData] = useState({
  //   imgUrl: null, // url
  //   itemTitle: null, // title
  // });
  const { isLogin } = useAuthContext();

  const match = useRouteMatch();
  const history = useHistory();

  const openModal = () => history.push({ pathname: `${match.url}/${id}` });
  const openEditSets = () => setEditedData({ imgUrl, itemTitle });

  // const handleEditData = () => {
  //   !editedData.imgUrl
  //     ? setEditedData({ imgUrl, itemTitle })
  //     : editData(id, editedData).finally(() =>
  //         setEditedData({ itemTitle: null, imgUrl: null }),
  //       );
  // };
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

    editData(id, data).finally(() => setEditedData(null));
  };

  const handleDeleteData = () => {
    deleteData(id);
  };

  return (
    <li key={id} className={s.item}>
      <div className={s.imgWrapper}>
        {!editedData ? (
          <img className={s.img} src={imgUrl} alt={itemTitle}></img>
        ) : (
          <FileUploader
            setImage={setImage}
            editData={editData}
            uploadData={handleEditData}
          />
        )}
      </div>

      <div className={s.itemMenu}>
        {!editedData ? (
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

      {isLogin && (
        <CardWithMenu
          isEditing={editedData?.itemTitle}
          onEdit={openEditSets}
          onDelete={handleDeleteData}
        />
      )}
    </li>
  );
};

Item.propTypes = {};

export default Item;

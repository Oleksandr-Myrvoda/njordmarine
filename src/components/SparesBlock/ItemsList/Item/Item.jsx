import { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';
import CardWithMenu from 'common/CardWithMenu';
import PropTypes from 'prop-types';

import FileUploader from '../FileUploader';
import s from './Item.module.css';

const Item = ({
  itemTitle,
  itemTitleRu,
  itemTitleEn,
  imgUrl,
  id,
  editData,
  deleteData,
  setImage,
}) => {
  const [editedData, setEditedData] = useState(null); //{ imgUrl, itemTitle }
  const { isLogin } = useAuthContext();

  const match = useRouteMatch();
  const history = useHistory();

  const openModal = () => history.push({ pathname: `${match.url}/${id}` });
  const openEditSets = () =>
    setEditedData({ imgUrl, itemTitleRu, itemTitleEn });
  // const openEditSets = () => setEditedData({ imgUrl, itemTitle });

  const handleEditData = imgUrl => {
    const { itemTitleRu, itemTitleEn } = editedData;
    let data = null;
    if (imgUrl && itemTitleRu && itemTitleEn) {
      data = { itemTitleRu, itemTitleEn, imgUrl };
    } else if (imgUrl) {
      data = { imgUrl };
    } else if (itemTitleRu && itemTitleEn) {
      data = { itemTitleRu, itemTitleEn };
    } else return;

    editData(id, data).finally(() => setEditedData(null));
  };
  // const handleEditData = imgUrl => {
  //   const { itemTitle } = editedData;
  //   let data = null;
  //   if (imgUrl && itemTitle) {
  //     data = { itemTitle, imgUrl };
  //   } else if (imgUrl) {
  //     data = { imgUrl };
  //   } else if (itemTitle) {
  //     data = { itemTitle };
  //   } else return;

  //   editData(id, data).finally(() => setEditedData(null));
  // };

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
          // <p className={s.title}> {itemTitle}</p>
          <>
            <p className={s.title}> {itemTitleRu}</p>
            <p className={s.title}> {itemTitleEn}</p>
          </>
        ) : (
          <>
            <input
              type="text"
              value={editedData.itemTitleRu}
              name="itemTitleRu"
              onChange={e =>
                setEditedData(prev => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <input
              type="text"
              value={editedData.itemTitleEn}
              name="itemTitleEn"
              onChange={e =>
                setEditedData(prev => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </>
          // <input
          //   type="text"
          //   value={editedData.itemTitle}
          //   name="itemTitle"
          //   onChange={e =>
          //     setEditedData(prev => ({
          //       ...prev,
          //       [e.target.name]: e.target.value,
          //     }))
          //   }
          // />
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

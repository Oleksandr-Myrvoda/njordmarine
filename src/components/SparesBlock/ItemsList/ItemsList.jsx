import { Route, useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import BrendsModal from './BrendsModal';
import Item from './Item';

import s from './ItemsList.module.css';

const ItemsList = ({ items, editData, deleteData, setSpares, setImage }) => {
  const [modalData, setModalData] = useState(null);
  const match = useRouteMatch();

  useEffect(() => {
    if (items && modalData) {
      const item = items.find(item => item.id === modalData.id);
      if (!item) {
        return;
      }
      setModalData(prev => ({ ...prev, brends: item.brends }));
    }
    // eslint-disable-next-line
  }, [items]);

  return (
    <>
      <ul className={s.listWrapper}>
        {items.map(({ itemTitle, imgUrl, id, brends = [] }) => {
          return (
            <Item
              key={id}
              id={id}
              itemTitle={itemTitle}
              imgUrl={imgUrl}
              editData={editData}
              deleteData={deleteData}
              setImage={setImage}
              setModalData={setModalData}
              brends={brends}
            />
          );
        })}
      </ul>

      {modalData && (
        <Route
          path={`${match.path}/:itemId`}
          render={() => (
            <BrendsModal setSpares={setSpares} modalData={modalData} />
          )}
        />
      )}
    </>
  );
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      itemTitle: PropTypes.string,
    }),
  ).isRequired,
  editData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
};

export default ItemsList;

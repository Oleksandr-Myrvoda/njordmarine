import { Route, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import BrendsModal from './BrendsModal';
import Item from './Item';

import s from './ItemsList.module.css';

const ItemsList = ({ items, editData, deleteData, setSpares, setImage }) => {
  const match = useRouteMatch();

  return (
    <>
      <ul className={s.listWrapper}>
        {items.map(({ itemTitle, imgUrl, id }) => {
          return (
            <Item
              key={id}
              id={id}
              itemTitle={itemTitle}
              imgUrl={imgUrl}
              editData={editData}
              deleteData={deleteData}
              setImage={setImage}
            />
          );
        })}
      </ul>

      <Route
        path={`${match.path}/:itemId`}
        render={() => <BrendsModal items={items} setSpares={setSpares} />}
      />
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

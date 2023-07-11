import { Route, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'common/Modal';
import BrendsList from './BrendsList';
import Item from './Item';

import s from './ItemsList.module.css';
import BrendsModal from './BrendsModal/BrendsModal';

const ItemsList = ({
  items,
  onEditItem,
  onDeleteItem,
  editData,
  deleteData,
  editBrend,
  setSpares,
}) => {
  const match = useRouteMatch();

  // const itemsNormalize = [...items].map(
  //   ({ itemTitle = '', imgUrl, brends = [], id }) => {
  //     const brendsNormalize = Object.entries(brends).map(([id, brend = []]) => {
  //       if (typeof brend === 'string') {
  //         return { id, brend };
  //       }
  //       return { id, ...brend };
  //     });
  //     // console.log('brendsNormal', brendsNormalize);
  //     return { itemTitle, imgUrl, brends: [...brendsNormalize], id };
  //   },
  // );

  // console.log('itemsNorma', itemsNormalize);

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
            />
          );
        })}
      </ul>

      <Route
        path={`${match.path}/:itemId`}
        render={routerProps => {
          const { match, history } = routerProps;
          const { itemId } = match.params;
          const { itemTitle, brends } = items.find(el => el.id === itemId);
          // console.log('items', items);
          const closeModal = () => {
            history.goBack();
          };

          return (
            <Modal title={itemTitle} onClose={closeModal}>
              <BrendsList
                // path={match.path}
                brends={brends}
                onClose={closeModal}
                editBrend={editBrend}
                setSpares={setSpares}
              />
              {/* <BrendsList brends={brends} onClose={closeModal} /> */}
            </Modal>
          );
        }}
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

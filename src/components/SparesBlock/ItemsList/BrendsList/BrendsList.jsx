import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import BigButton from 'common/BigButton';
import CardWithMenu from 'common/CardWithMenu';
import PropTypes from 'prop-types';
import { addBrendApi } from 'services/api';
import * as api from 'services/api';
import s from './BrendsList.module.css';
import BrendItem from './BrendItem/BrendItem';

// const BrendItem = ({ brend, id }) => {
//   const [isAuth] = useState(true);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <li
//       key={id}
//       className={s.item}
//       onClick={e => {
//         if (e.target !== e.currentTarget) return;
//         setIsMenuOpen(prevState => !prevState);
//       }}
//     >
//       {brend}
//       {isAuth && isMenuOpen && (
//         <CardWithMenu
//         // isEditing={editedData.itemTitle}
//         // onEdit={handleEditData}
//         // onDelete={handleDeleteData}
//         />
//         // <>
//         //   <button type="button">Remove</button>
//         //   <button type="button">Edit</button>
//         // </>
//       )}
//     </li>
//   );
// };

const BrendsList = ({ brends = [], onClose }) => {
  const match = useRouteMatch();

  // const [brendList, setBrendList] = useState([]);
  const [brendList, setBrendList] = useState(brends);
  const [newBrend, setNewBrend] = useState('');

  // useEffect(() => {
  //   setBrendList(brendList);
  // }, [brendList]);

  // GET =======
  // console.log('path', path);
  // useEffect(() => {
  //   const fetchBrends = async () => {
  //     const brendsApi = await api.getData(path);
  //     setBrendList(brendsApi);
  //   };
  //   fetchBrends();
  // }, [path]);

  // ADD ===============================================

  const addBrend = async e => {
    e.preventDefault();
    try {
      const newBrendAdd = await api.addBrendApi({
        endpoint: match.url,
        brend: newBrend,
      });
      setBrendList(prevData => [...prevData, newBrendAdd]);
    } catch (error) {
      console.log(error.message);
    } finally {
      reset();
    }
  };

  // EDIT =======

  const editBrend = (id, editedData) => {
    return api
      .editBrendApi({ endpoint: match.url, item: editedData, id })
      .then(data => {
        setBrendList(prevData =>
          prevData.map(el => (el.id !== data.id ? el : { ...el, ...data })),
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // DELETE =======

  const deleteBrend = (id, deletedData) => {
    return api
      .deleteItemApi({ endpoint: match.url, item: deletedData, id })
      .then(data => {
        console.log('data', data);
        setBrendList(prevSpares => prevSpares.filter(el => el.id !== data.id));
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  // ===============================================
  const reset = () => {
    setNewBrend('');
  };

  return (
    <div className={s.listWrapper}>
      <ul className={s.list}>
        {brendList.map(({ id, brend }) => (
          <BrendItem
            brend={brend}
            key={id}
            editBrend={editBrend}
            deleteBrend={deleteBrend}
          />
        ))}
      </ul>

      <form onSubmit={addBrend}>
        <input
          type="text"
          value={newBrend}
          onChange={e => setNewBrend(e.target.value)}
        />
        <button type="submit">Ok</button>
      </form>
      <BigButton onClick={onClose} text="Закрыть" />
    </div>
  );
};

BrendsList.propTypes = {
  brends: PropTypes.array.isRequired,
};

export default BrendsList;

import { useHistory, useRouteMatch } from 'react-router-dom';
import { useLangContext } from 'context/LangProvider';

import BrendsList from '../BrendsList/BrendsList';
import Modal from 'common/Modal/Modal';
import PropTypes from 'prop-types';
import React from 'react';

const BrendsModal = ({ setSpares, modalData }) => {
  // const match = useRouteMatch();
  const history = useHistory();
  const { lang } = useLangContext();
  // const { itemId } = match.params;
  // const curentItem = items.find(el => el.id === itemId);

  // const { itemTitle, brends } = curentItem ? curentItem : {};
  const { itemTitle, brends } = modalData;
  const closeModal = () => {
    history.goBack();
  };

  return (
    <Modal title={itemTitle[lang]} onClose={closeModal}>
      <BrendsList brends={brends} onClose={closeModal} setSpares={setSpares} />
    </Modal>
  );
};

BrendsModal.propTypes = {};

export default BrendsModal;

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'common/Modal/Modal';
import BrendsList from '../BrendsList/BrendsList';

const BrendsModal = ({ routerProps, items }) => {
  const { match, history } = routerProps;
  const { itemId } = match.params;
  const { itemTitle, brends } = items.find(el => el.id === itemId);

  const closeModal = () => {
    history.goBack();
  };

  return (
    <Modal title={itemTitle} onClose={closeModal}>
      <BrendsList brends={brends} onClose={closeModal} />
    </Modal>
  );
};

BrendsModal.propTypes = {};

export default BrendsModal;

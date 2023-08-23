import { useHistory } from 'react-router-dom';
import { useLangContext } from 'context/LangProvider';

import BrendsList from '../BrendsList/BrendsList';
import Modal from 'common/Modal/Modal';
import PropTypes from 'prop-types';
import React from 'react';

const BrendsModal = ({ setSpares, modalData }) => {
  const history = useHistory();
  const { lang } = useLangContext();

  const { itemTitle, brends } = modalData;
  const closeModal = () => {
    history.goBack();
  };

  return (
    <Modal title={itemTitle[lang]} onClose={closeModal} isModalWhiteBG={true}>
      <BrendsList brends={brends} onClose={closeModal} setSpares={setSpares} />
    </Modal>
  );
};

BrendsModal.propTypes = {};

export default BrendsModal;

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import BigButton from 'common/BigButton';
import Form from 'common/Form';
import Modal from 'common/Modal';

import s from './SendInfo.module.css';

const SendInfo = ({ linkName = '', linkPath = '', hideLink }) => {
  const { t } = useTranslation();

  const [formsList, setFormsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sendForm = newForm => {
    setFormsList([...formsList, newForm]);
    closeModal();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={s.contacts}>
      <BigButton onClick={openModal} text={t('sendInfo.bigBtn')} />
      <NavLink
        to={linkPath}
        className={clsx(hideLink && s.isHideLink)}
        activeClassName={s.NavItemActive}
        onClick={scrollToTop}
      >
        <span className={s.link}>{linkName}</span>
      </NavLink>

      {isModalOpen && (
        <Modal title={t('sendInfo.bigBtn')} onClose={closeModal}>
          <Form onSubmit={sendForm} isTitle={false} />
        </Modal>
      )}
    </div>
  );
};

SendInfo.propTypes = {
  linkName: PropTypes.string,
  linkPath: PropTypes.string,
  hideLink: PropTypes.bool.isRequired,
};

export default SendInfo;

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLockBodyScroll } from 'react-use';
import PropTypes from 'prop-types';
import closeBtn from '../../images/form-close-btn.png';
import s from './Modal.module.css';

const modalRootRef = document.querySelector('#modal-root');

const Modal = ({ onClose, title, children, isEmailSended, isModalOpen }) => {
  useLockBodyScroll(true);

  const [isOpen, setIsOpen] = useState(isModalOpen);

  useEffect(() => {
    const onEscPress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  console.log('isOpen', isOpen);
  return createPortal(
    <div
      // className={s.backdrop}
      className={`${s.backdrop} ${isOpen && s.open}`}
      onClick={handleBackdropClick}
    >
      <div className={s.modal}>
        <header className={s.header}>
          <div className={s.lead}>
            {!isEmailSended && <h3 className="tagline">{title}</h3>}
          </div>

          <button className={s.closeBtn} onClick={onClose} aria-label="Close">
            <img src={closeBtn} alt="close" />
          </button>
        </header>

        <div className={s.content}>{children}</div>
      </div>
    </div>,
    modalRootRef,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLockBodyScroll } from 'react-use';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import closeBtn from 'images/form-close-btn.svg';

import s from './Modal.module.css';

const modalRootRef = document.querySelector('#modal-root');

const Modal = ({
  onClose,
  title,
  children,
  isEmailSended,
  isModalWhiteBG,
  isFullScreenMobileSize,
}) => {
  // useLockBodyScroll(true);

  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  useEffect(() => {
    const onEscPress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
      document.body.removeAttribute('style');
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div
        className={`${s.modal} ${isModalWhiteBG && s.modalWhiteBG}
         ${isEmailSended && !isDesktop && s.fullScreenMobileSize} 
         ${isEmailSended && s.modalWhiteBG} 
         ${isFullScreenMobileSize && s.fullScreenMobileSize}
        ${isFullScreenMobileSize && s.modalWhiteBG}`}
      >
        <div>
          <header className={s.header}>
            <div className={s.lead}>
              {!isEmailSended && <h3 className="tagline">{title}</h3>}
            </div>

            <button className={s.closeBtn} onClick={onClose} aria-label="Close">
              <img className={s.closeBtnImg} src={closeBtn} alt="close" />
            </button>
          </header>

          <div className={s.content}>{children}</div>
        </div>
      </div>
    </div>,
    modalRootRef,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;

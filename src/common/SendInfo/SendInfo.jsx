import { useTranslation } from 'react-i18next';
import { Suspense, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import BigButton from 'common/BigButton';
import Form from 'common/Form';
import Modal from 'common/Modal';
import AfterSendEmail from './AfterSendEmail';

import s from './SendInfo.module.css';
import Loader from 'common/Loader';

const SendInfo = ({ linkName = '', linkPath = '', hideLink }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailSended, setEmailSended] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setEmailSended(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClick = () => {
    scrollToTop();
    history.push(linkPath);
  };

  return (
    <div className={s.contacts}>
      <Suspense
      // fallback={<Loader />}
      >
        <BigButton onClick={openModal} text={t('sendInfo.bigBtn')} />

        <div className={`${hideLink && s.isHideLink}`}>
          <button className={s.buttonLink} onClick={handleClick}>
            <div className={s.link}>{linkName}</div>
          </button>
        </div>

        {isModalOpen && (
          <Modal
            title={t('sendInfo.bigBtn')}
            onClose={closeModal}
            isEmailSended={isEmailSended}
            isModalOpen={isModalOpen}
          >
            {!isEmailSended ? (
              <Form isTitle={false} setEmailSended={setEmailSended} />
            ) : (
              <AfterSendEmail
                closeModal={closeModal}
                setEmailSended={setEmailSended}
              />
            )}
          </Modal>
        )}
      </Suspense>
    </div>
  );
};

SendInfo.propTypes = {
  linkName: PropTypes.string,
  linkPath: PropTypes.string,
  hideLink: PropTypes.bool.isRequired,
};

export default SendInfo;

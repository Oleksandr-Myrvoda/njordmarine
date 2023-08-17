import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import BigButton from 'common/BigButton';

import sendRequest from 'images/send-request.svg';
import s from './SendInfo.module.css';

const AfterSendEmail = ({ closeModal }) => {
  const isDesktopBig = useMediaQuery({ query: '(min-width: 2560px)' });
  const { t } = useTranslation();
  return (
    <div className={s.afterBlock}>
      <img
        className={`${isDesktopBig ? s.afterImg : ''}`}
        src={sendRequest}
        alt="mail"
      />
      <div className={s.afterTextWrapper}>
        <h1 className="tagline">{t('afterSendEmail.title')}</h1>
        <p className={s.afterText}>{t('afterSendEmail.text')}</p>
      </div>
      <BigButton
        type="button"
        text={t('afterSendEmail.bigBtn')}
        onClick={closeModal}
      />
    </div>
  );
};

AfterSendEmail.propTypes = {};

export default AfterSendEmail;

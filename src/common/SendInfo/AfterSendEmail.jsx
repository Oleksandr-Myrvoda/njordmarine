import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import BigButton from 'common/BigButton';

import sendRequest from 'images/send-request.svg';
import s from './SendInfo.module.css';
import Image from 'common/Image/Image';

const AfterSendEmail = ({ closeModal }) => {
  const { t } = useTranslation();
  return (
    <div className={s.afterBlock}>
      <Image src={sendRequest} alt="mail" />
      <div className={s.afterTextWrapper}>
        <h1 className="tagline">{t('afterSendEmail.title')}</h1>
        <p>{t('afterSendEmail.text')}</p>
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

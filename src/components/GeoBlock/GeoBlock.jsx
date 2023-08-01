import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import BigButton from 'common/BigButton';
import globe from 'images/globe.png';
import globeMob from 'images/globe-mob.png';
import s from './GeoBlock.module.css';

const GeoBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const globeImage = isDesktop ? globe : globeMob;

  const history = useHistory();
  const toContacts = () => {
    history.push('/contacts');
  };

  return (
    <div className={s.geoBlock}>
      <div className={s.description}>
        <div className={s.descriptionInside}>
          <p className="headingBlock">{t('geoBlock.heading')}</p>
          <h2 className="tagline">{t('geoBlock.tagline')}</h2>
          <p className={s.text}>{t('geoBlock.text')}</p>
        </div>
        <img src={globeImage} alt="globe" />
      </div>
      <div className={s.contactUs}>
        <p className="taglineBig">{t('geoBlock.taglineBig')}</p>
        <p className={s.text}>{t('geoBlock.text2')}</p>

        <BigButton onClick={toContacts} text={t('geoBlock.bigButtonText')} />
        <a href="/" className={s.link}>
          {t('geoBlock.bigButtonLink')}
        </a>
      </div>
    </div>
  );
};

export default GeoBlock;

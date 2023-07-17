import { useMediaQuery } from 'react-responsive';
import globe from 'images/globe.png';
import globeMob from 'images/globe-mob.png';
import s from './GeoBlock.module.css';
import BigButton from 'common/BigButton';

const GeoBlock = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const globeImage = isDesktop ? globe : globeMob;

  return (
    <div className={s.geoBlock}>
      <div className={s.description}>
        <div className={s.descriptionInside}>
          <p className="headingBlock">Карта покрытия</p>
          <h2 className="tagline">Работы ведутся по всему миру</h2>
          <p className={s.text}>
            Мы обеспечиваем обслуживание судов повсеместно, гарантируя, что наша
            команда опытных профессионалов всегда готова оказать
            квалифицированную помощь вашему судну, независимо от того в какой
            точке мира оно находится.
          </p>
        </div>
        <img src={globeImage} alt="globe" />
      </div>
      <div className={s.contactUs}>
        <p className="taglineBig">Свяжитесь с нами</p>
        <p className={s.text}>Мы всегда готовы прийти к Вам на помощь!</p>
        {!isDesktop && (
          <>
            <BigButton text="Контакты" />
            <a href="/services" className={s.link}>
              Ознакомиться с услугами
            </a>
          </>
        )}

        <BigButton text="Контакты" />
        <a href="/" className={s.link}>
          Скачать нашу брошюру
        </a>
      </div>
    </div>
  );
};

export default GeoBlock;

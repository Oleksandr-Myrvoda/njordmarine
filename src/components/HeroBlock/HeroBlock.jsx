import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import ship from 'images/hero-bg-mob.png';
import SendInfo from 'common/SendInfo';
import s from './HeroBlock.module.css';

const HeroBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  return (
    <div className={s.heroBlock}>
      <div className={s.heroContent}>
        <div className={s.heroWrapper}>
          <p className={s.head}>{t('heroBlock.head')}</p>

          <h1 className="taglineBig">{t('heroBlock.taglineBig')}</h1>

          <p className={s.description}>{t('heroBlock.description')}</p>
        </div>

        {!isDesktop && <img src={ship} alt="ship" />}

        <SendInfo
          linkName={t('heroBlock.sendInfo')}
          linkPath="/services"
          hideLink={false}
        />

        <div className={s.nav}></div>
        <ul className={s.list}>
          <li className={s.listItem}>
            <p className={s.top}>{t('heroBlock.top1')}</p>
            <p className={s.bot}>{t('heroBlock.bot1')}</p>
          </li>
          <li className={s.listItem}>
            <p className={s.top}>{t('heroBlock.top2')}</p>
            <p className={s.bot}>{t('heroBlock.bot2')}</p>
          </li>
          <li className={s.listItem}>
            <p className={s.top}>{t('heroBlock.top3')}</p>
            <p className={s.bot}>{t('heroBlock.bot3')}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default HeroBlock;

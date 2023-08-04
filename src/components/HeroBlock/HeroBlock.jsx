import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import ship from 'images/hero-bg-mob.png';
import SendInfo from 'common/SendInfo';
import s from './HeroBlock.module.css';
import Container from 'common/Container/Container';
import CounterAnimation from 'common/CounterAnimation/CounterAnimation';

const HeroBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  return (
    <div className={s.heroBlock}>
      <Container>
        <div className={s.heroContent}>
          <div className={s.heroWrapper}>
            {/* <p className={s.head}>{t('heroBlock.head')}</p> */}
            <div className={s.head}>{t('heroBlock.head')}</div>
            <div className={s.taglineBig}>
              <h1 className="taglineBig">{t('heroBlock.taglineBig')}</h1>
            </div>

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
              <CounterAnimation endValue="800" />

              {/* <p className={s.top}>{t('heroBlock.top1')}</p> */}
              <p className={s.bot}>{t('heroBlock.bot1')}</p>
            </li>
            <li className={s.listItem}>
              <CounterAnimation endValue="5" />
              {/* <p className={s.top}>{t('heroBlock.top2')}</p> */}
              <p className={s.bot}>{t('heroBlock.bot2')}</p>
            </li>
            <li className={s.listItem}>
              <CounterAnimation endValue="20" />
              {/* <p className={s.top}>{t('heroBlock.top3')}</p> */}
              <p className={s.bot}>{t('heroBlock.bot3')}</p>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};
export default HeroBlock;

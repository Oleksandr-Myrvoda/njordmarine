import { useTranslation } from 'react-i18next';
import SendInfo from 'common/SendInfo/SendInfo';
import { useEffect, useState } from 'react';
import Measurements from './Measurements';
import { measurementsConfig } from 'data/measurements';
import s from './MaintenanceService.module.css';
import Trail from 'common/Trail/Trail';

const MaintenanceService = () => {
  const { t } = useTranslation();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);
  return (
    <div className={s.blockWrapper}>
      <div className={s.hero}>
        <Trail
          open={isAnimated}
          // textStyle="taglineBig"
          heightD={60}
          heightMob={80}
        >
          <p className={s.title}>{t('services.meintenance.title')}</p>
        </Trail>
      </div>

      <div>
        <p className={s.text}>{t('services.meintenance.text1')}</p>
        <p className={s.text}>{t('services.meintenance.text2')}</p>
      </div>

      <div className={s.paginationBlock}>
        <Measurements measurementsConfig={measurementsConfig} />
      </div>

      <div className={s.sendInfo}>
        <SendInfo
          linkName={t('sendInfo.energy')}
          linkPath="/services/energy"
          hideLink={false}
        />
      </div>
    </div>
  );
};

export default MaintenanceService;
// Расход топлива Главными, Вспомогательными двигателями, Котлами (расходы - часовой, суммарный, за определенный, выбранный промежуток времени)

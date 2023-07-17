import SendInfo from 'common/SendInfo/SendInfo';
import s from './MaintenanceService.module.css';
import Measurements from './Measurements';
import { measurementsConfig } from 'data/measurements';

const MaintenanceService = () => {
  return (
    <div className={s.blockWrapper}>
      <div className={s.hero}>
        <p className={s.title}>Техническое обслуживание</p>
      </div>

      <div>
        <p className={s.text}>
          Мы предоставляем услуги ультразвуковых измерений толщин на всех типах
          судов , имеем сертификаты классификационных обществ - BV, DNV, ABS,
          RINA и РМРС.
        </p>
        <p className={s.text}>
          Замеры на высоте производятся нашими техническими альпинистами,
          имеющими сертификаты DNV и ABS классификационных обществ для
          выполнения соответствующих работ.
        </p>
      </div>
      <div className={s.paginationBlock}>
        <Measurements measurementsConfig={measurementsConfig} />
      </div>

      <SendInfo
        linkName="Система энергоэффективности судна"
        linkPath="/services/energy"
        hideLink={false}
      />
    </div>
  );
};

export default MaintenanceService;

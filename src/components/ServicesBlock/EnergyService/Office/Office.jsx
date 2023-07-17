import SendInfo from 'common/SendInfo';
import ListWithDot from '../ListWithDot';
import { officeConfig } from 'data/office';

import s from './Office.module.css';

const Office = () => {
  return (
    <div className={s.blockWrapper}>
      <div className={s.hero}>
        <p className={s.title}>Офисное решение</p>
      </div>

      <p className={s.text}>
        Благодаря нашему офисному решению
        <span className={s.focus}>“FOCUS Onshore”</span>, Вы легко сможете
        контролировать все показатели рабочих параметров судна с последующей
        корректировкой в режиме онлайн.
      </p>

      <h2 className={s.head}>
        Система отображает и позволяет контролировать следующие параметры:
      </h2>

      <ListWithDot config={officeConfig} />

      <SendInfo linkName="Запчасти" linkPath="/spares" hideLink={false} />
    </div>
  );
};

export default Office;

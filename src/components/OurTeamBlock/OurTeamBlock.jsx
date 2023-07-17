import { ourTeamConfig } from 'data/our-team';
import OurTeamList from './OurTeamList';
import s from './OurTeamBlock.module.css';
import SendInfo from 'common/SendInfo/SendInfo';

const OurTeamBlock = () => {
  return (
    <div className={s.ourTeamBlock}>
      <div className={s.descr}>
        <h1 className="taglineBig">Наша команда</h1>
        <p className="text">
          Наша команда опытных профессионалов всегда готова оказать
          квалифицированную помощь.
        </p>
      </div>

      <OurTeamList ourTeamConfig={ourTeamConfig} />

      <SendInfo
        linkName="Ознакомиться с услугами"
        linkPath="/services"
        hideLink={false}
      />
    </div>
  );
};

export default OurTeamBlock;

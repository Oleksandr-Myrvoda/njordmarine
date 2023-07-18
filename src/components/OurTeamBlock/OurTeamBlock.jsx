import { useTranslation } from 'react-i18next';
import { ourTeamConfig } from 'data/our-team';
import OurTeamList from './OurTeamList';
import s from './OurTeamBlock.module.css';
import SendInfo from 'common/SendInfo/SendInfo';

const OurTeamBlock = () => {
  const { t } = useTranslation();
  return (
    <div className={s.ourTeamBlock}>
      <div className={s.descr}>
        <h1 className="taglineBig">{t('ourTeamBlock.taglineBig')}</h1>
        <p className="text">{t('ourTeamBlock.text')}</p>
      </div>

      <OurTeamList ourTeamConfig={ourTeamConfig} />

      <SendInfo
        linkName={t('sendInfo.services')}
        linkPath="/services"
        hideLink={false}
      />
    </div>
  );
};

export default OurTeamBlock;

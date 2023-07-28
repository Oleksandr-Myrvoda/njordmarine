import { useTranslation } from 'react-i18next';
import { ourTeamConfig } from 'data/our-team';
import OurTeamList from './OurTeamList';
import SendInfo from 'common/SendInfo/SendInfo';
import Container from 'common/Container/Container';
import s from './OurTeamBlock.module.css';

const OurTeamBlock = () => {
  const { t } = useTranslation();

  return (
    <div className={s.ourTeamBlock}>
      <Container>
        <div className={s.descr}>
          <h1 className="taglineBig">{t('ourTeamBlock.taglineBig')}</h1>
          <p className={s.description}>{t('ourTeamBlock.text')}</p>
        </div>

        <OurTeamList ourTeamConfig={ourTeamConfig} />

        <div className={s.sendInfo}>
          <SendInfo
            linkName={t('sendInfo.services')}
            linkPath="/services"
            hideLink={false}
          />
        </div>
      </Container>
    </div>
  );
};

export default OurTeamBlock;

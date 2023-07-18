import { useTranslation } from 'react-i18next';
import Scheme from './Scheme';
import WorksList from './WorksList';
import { schemeConfig } from 'data/scheme';
import { worksConfig } from 'data/works';

import s from './AutomationService.module.css';

const AutomationService = () => {
  const { t } = useTranslation();
  return (
    <div className={s.blockWrapper}>
      <div className={s.hero}>
        <p className={s.title}>{t('services.auto.title')}</p>
      </div>

      <p className={s.text}>{t('services.auto.text')}</p>

      <Scheme schemeConfig={schemeConfig} />
      <WorksList worksConfig={worksConfig} />
    </div>
  );
};

export default AutomationService;

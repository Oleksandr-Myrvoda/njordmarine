import { useTranslation } from 'react-i18next';
import s from './BrochureButton.module.css';

const BrochureButton = () => {
  const { t } = useTranslation();
  return (
    <button className={s.brochureBtn} type="button">
      {t('common.brochureBtn')}
    </button>
  );
};

export default BrochureButton;

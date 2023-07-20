import { useTranslation } from 'react-i18next';
import MenuItem from './MenuItem';
import s from './EnergyMenu.module.css';

const EnergyMenu = () => {
  const { t } = useTranslation();
  return (
    <nav className={s.nav}>
      <MenuItem name={t('energyMenu.name1')} to="on-board" />
      <MenuItem name={t('energyMenu.name2')} to="focus" />
      <MenuItem name={t('energyMenu.name3')} to="office" />
    </nav>
  );
};

export default EnergyMenu;

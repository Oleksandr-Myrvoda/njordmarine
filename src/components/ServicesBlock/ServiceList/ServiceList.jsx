import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Paper from 'common/Paper';
import PropTypes from 'prop-types';

import refreshSquare from 'images/service-RefreshSquare.svg';
import settings from 'images/service-Settings.svg';
import tools from 'images/service-Tools.svg';
import diagramUp from 'images/service-DiagramUp.svg';
import s from './ServiceList.module.css';

const ServiceList = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ul className={s.list}>
      <li>
        <Paper>
          <NavLink to="services/automation" onClick={scrollToTop}>
            <div className={s.item}>
              <img
                className={s.image}
                src={refreshSquare}
                alt={t('servicesBlock.list.alt1')}
              />
              <p className={s.descr}>{t('servicesBlock.list.text1')}</p>
              <p className={s.link}>{t('servicesBlock.list.link')}</p>
            </div>
          </NavLink>
        </Paper>
      </li>
      <li>
        <Paper>
          <NavLink to="services/maintenance" onClick={scrollToTop}>
            <div className={s.item}>
              <img
                className={s.image}
                src={settings}
                alt={t('servicesBlock.list.alt2')}
              />
              <p className={s.descr}>{t('servicesBlock.list.text2')}</p>
              <p className={s.link}>{t('servicesBlock.list.link')}</p>
            </div>
          </NavLink>
        </Paper>
      </li>
      <li>
        <Paper>
          <NavLink to="spares" onClick={scrollToTop}>
            <div className={s.item}>
              <img
                className={s.image}
                src={tools}
                alt={t('servicesBlock.list.alt3')}
              />
              <p className={s.descr}>{t('servicesBlock.list.text3')}</p>
              <p className={s.link}>{t('servicesBlock.list.link')}</p>
            </div>
          </NavLink>
        </Paper>
      </li>
      <li>
        <Paper>
          <NavLink to="services/energy" onClick={scrollToTop}>
            <div className={s.item}>
              <img
                className={s.image}
                src={diagramUp}
                alt={t('servicesBlock.list.alt4')}
              />
              <p className={s.descr}>{t('servicesBlock.list.text4')}</p>
              <p className={s.link}>{t('servicesBlock.list.link')}</p>
            </div>
          </NavLink>
        </Paper>
      </li>
    </ul>
  );
  // return (
  //   <ul className={s.list}>
  //     {serviceConfig.map(({ imgUrl, text, alt, to }, index) => (
  //       <li key={index}>
  //         <Paper>
  //           <NavLink to={to} onClick={scrollToTop}>
  //             <div className={s.item}>
  //               <img className={s.image} src={imgUrl} alt={alt} />
  //               <p className={s.descr}>{text}</p>
  //               <p className={s.link}>{t('servicesBlock.list.link')}</p>
  //             </div>
  //           </NavLink>
  //         </Paper>
  //       </li>
  //     ))}
  //   </ul>
  // );
};

// ServiceList.propTypes = {
//   serviceConfig: PropTypes.arrayOf(
//     PropTypes.shape({
//       imgUrl: PropTypes.string,
//       text: PropTypes.string,
//       alt: PropTypes.string,
//     }),
//   ).isRequired,
// };

export default ServiceList;

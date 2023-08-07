import { useState, useEffect, Suspense, lazy } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import Container from 'common/Container';
import BlockNavigation from 'components/BlockNavigation';

import { servicesListConfig } from 'data/services-list';
import Loader from 'common/Loader';
import s from './ServicesListPage.module.css';
import Trail from 'common/Trail/Trail';

const AutomationService = lazy(() =>
  import(
    'components/ServicesBlock/AutomationService' /* webpackChunkName: "AutomationService___page" */
  ),
);
const MaintenanceService = lazy(() =>
  import(
    'components/ServicesBlock/MaintenanceService' /* webpackChunkName: "MaintenanceService___page" */
  ),
);
const EnergyService = lazy(() =>
  import(
    'components/ServicesBlock/EnergyService' /* webpackChunkName: "EnergyService___page" */
  ),
);

const ServicesListPage = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const match = useRouteMatch();
  const location = useLocation();

  const [isAnimated, setIsAnimated] = useState(false);

  const autoBG = `${match.path}/automation`;
  const focusBG = `${match.path}/maintenance`;
  const energyBG = `${match.path}/energy`;

  const isAuto = location.pathname === autoBG;
  const isFocus = location.pathname === focusBG;
  const isEnergy = location.pathname.startsWith(energyBG);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <div
      className={`${s.pageWrapper}
      ${isAuto && s.onBoardBG}
      ${isFocus && s.focusBG} 
      ${isEnergy && s.energyBG}`}
    >
      <div className={s.taglineWrapper}>
        {/* <div className={s.trailWrapper}> */}
        <Trail
          open={isAnimated}
          // textStyle="taglineBig"
          heightD={60}
          heightMob={16}
        >
          <h1 className="taglineBig">{t('services.taglineBig')}</h1>
        </Trail>
        {/* </div> */}

        {isDesktop && <BlockNavigation navConfig={servicesListConfig} />}
      </div>

      <Container>
        <div className={s.pagesBlock}>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route
                exact
                path={`${match.path}`}
                render={() => <Redirect to={`${match.path}/automation`} />}
              />

              <Route path={`${match.path}/automation`}>
                <AutomationService />
              </Route>

              <Route path={`${match.path}/maintenance`}>
                <MaintenanceService />
              </Route>

              <Route path={`${match.path}/energy`}>
                <EnergyService />
              </Route>

              <Route render={() => <Redirect to={match.url} />} />
            </Switch>
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default ServicesListPage;

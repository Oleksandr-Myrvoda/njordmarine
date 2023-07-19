import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import Container from 'common/Container';
import BlockNavigation from 'components/BlockNavigation';
// import AutomationService from 'components/ServicesBlock/AutomationService';
// import MaintenanceService from 'components/ServicesBlock/MaintenanceService';
// import EnergyService from 'components/ServicesBlock/EnergyService';
import { servicesListConfig } from 'data/services-list';
import s from './ServicesListPage.module.css';

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

  return (
    <div className={s.pageWrapper}>
      <div className={s.taglineWrapper}>
        <h1 className="taglineBig">{t('services.taglineBig')}</h1>
        {isDesktop && <BlockNavigation navConfig={servicesListConfig} />}
      </div>

      <Container>
        <div className={s.pagesBlock}>
          <Suspense fallback={<h2>"Loading..."</h2>}>
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
            </Switch>
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default ServicesListPage;

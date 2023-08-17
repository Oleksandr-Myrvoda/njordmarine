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
import { sparesListConfig } from 'data/spares-list';
import Container from 'common/Container';

import BlockNavigation from 'components/BlockNavigation';
import Loader from 'common/Loader';
import s from './SparesPage.module.css';
import Trail from 'common/Trail/Trail';

const SparesBlock = lazy(() =>
  import('components/SparesBlock' /* webpackChunkName: "SparesBlock___page" */),
);

const SparesPage = ({ token }) => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const match = useRouteMatch();

  const [isAnimated, setIsAnimated] = useState(false);

  const contactsLang = t('sendInfo.contacts');
  const deckLang = t('sendInfo.deck');
  const bridgeLang = t('sendInfo.bridge');

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <div className={s.pageWrapper}>
      <Container>
        <div className={s.taglineWrapper}>
          <div className={s.trailWrapper}>
            <Trail
              open={isAnimated}
              heightBig={110}
              heightD={60}
              heightMob={48}
            >
              <h1 className="taglineBig">{t('spares.taglineBig')}</h1>
            </Trail>
          </div>

          {isDesktop && <BlockNavigation navConfig={sparesListConfig} />}
        </div>
        <div className={s.pagesBlock}>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route
                exact
                path={`${match.path}`}
                render={() => <Redirect to={`${match.path}/engine-room`} />}
              />

              <Route path={`${match.path}/engine-room`}>
                <SparesBlock
                  token={token}
                  path={`${match.path}/engine-room`}
                  name={t('spares.engine')}
                  linkPath={!isDesktop ? `${match.path}/deck` : '/contacts'} // props for <SendInfo />
                  linkName={!isDesktop ? deckLang : contactsLang} // props for <SendInfo />
                />
              </Route>
              <Route path={`${match.path}/deck`}>
                <SparesBlock
                  path={`${match.path}/deck`}
                  name={t('spares.deck')}
                  linkPath={!isDesktop ? `${match.path}/bridge` : '/contacts'} // props for <SendInfo />
                  linkName={!isDesktop ? bridgeLang : contactsLang} // props for <SendInfo />
                />
              </Route>
              <Route path={`${match.path}/bridge`}>
                <SparesBlock
                  path={`${match.path}/bridge`}
                  name={t('spares.bridge')}
                  linkPath="/contacts" // props for <SendInfo />
                  linkName={contactsLang} // props for <SendInfo />
                />
              </Route>

              <Route render={() => <Redirect to={match.url} />} />
            </Switch>
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default SparesPage;

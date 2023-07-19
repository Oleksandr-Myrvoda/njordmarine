import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { sparesListConfig } from 'data/spares-list';
import Container from 'common/Container';
// import SparesBlock from 'components/SparesBlock';
import BlockNavigation from 'components/BlockNavigation/BlockNavigation';
import s from './SparesPage.module.css';

const SparesBlock = lazy(() =>
  import('components/SparesBlock' /* webpackChunkName: "SparesBlock___page" */),
);

const SparesPage = ({ token }) => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const match = useRouteMatch();

  const contactsLang = t('sendInfo.contacts');
  const deckLang = t('sendInfo.deck');
  const bridgeLang = t('sendInfo.bridge');

  return (
    <div className={s.pageWrapper}>
      <div className={s.taglineWrapper}>
        <h1 className="taglineBig">{t('spares.taglineBig')}</h1>

        {isDesktop && <BlockNavigation navConfig={sparesListConfig} />}
      </div>

      <Container>
        <div className={s.pagesBlock}>
          <Suspense fallback={<h2>"Loading..."</h2>}>
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
            </Switch>
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default SparesPage;

import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { sparesListConfig } from 'data/spares-list';
import Container from 'common/Container';
import s from './SparesPage.module.css';
import SparesBlock from 'components/SparesBlock';
import BlockNavigation from 'components/BlockNavigation/BlockNavigation';

const SparesPage = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const match = useRouteMatch();

  return (
    <div className={s.pageWrapper}>
      <div className={s.taglineWrapper}>
        <h1 className="taglineBig">Запчасти</h1>

        {isDesktop && <BlockNavigation navConfig={sparesListConfig} />}
      </div>

      <Container>
        <div className={s.pagesBlock}>
          <Switch>
            <Route
              exact
              path={`${match.path}`}
              render={() => <Redirect to={`${match.path}/engine-room`} />}
            />

            <Route path={`${match.path}/engine-room`}>
              <SparesBlock
                path={`${match.path}/engine-room`}
                name="Машинное отделение"
                linkPath={!isDesktop ? `${match.path}/deck` : '/contacts'} // props for <SendInfo />
                linkName={!isDesktop ? 'Палуба' : 'Контакты'} // props for <SendInfo />
              />
            </Route>
            <Route path={`${match.path}/deck`}>
              <SparesBlock
                path={`${match.path}/deck`}
                name="Палуба"
                linkPath={!isDesktop ? `${match.path}/bridge` : '/contacts'} // props for <SendInfo />
                linkName={!isDesktop ? 'Мостик' : 'Контакты'} // props for <SendInfo />
              />
            </Route>
            <Route path={`${match.path}/bridge`}>
              <SparesBlock
                path={`${match.path}/bridge`}
                name="Мостик"
                linkPath="/contacts" // props for <SendInfo />
                linkName="Контакты" // props for <SendInfo />
              />
            </Route>
          </Switch>
        </div>
      </Container>
    </div>
  );
};

export default SparesPage;

import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import EnergyMenu from './EnergyMenu';
import OnBoard from './OnBoard';
import Focus from './Focus';
import Office from './Office';
import NotFound from 'pages/NotFound';
import s from './EnergyService.module.css';

const EnergyService = () => {
  const match = useRouteMatch();

  return (
    <div className={s.blockWrapper}>
      <EnergyMenu />

      <Switch>
        <Route
          exact
          path={`${match.path}`}
          render={() => <Redirect to={`${match.path}/on-board`} />}
        />

        <Route path={`${match.path}/on-board`}>
          <OnBoard />
        </Route>
        <Route path={`${match.path}/focus`}>
          <Focus />
        </Route>
        <Route path={`${match.path}/office`}>
          <Office />
        </Route>

        <Route render={() => <Redirect to={match.url} />} />
      </Switch>
    </div>
  );
};

export default EnergyService;

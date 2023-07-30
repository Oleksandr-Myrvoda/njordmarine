import { Suspense, lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Loader from 'common/Loader/Loader';
import LoaderSpinner from 'common/LoaderSpinner/LoaderSpinner';

const HeroAboutBlock = lazy(() =>
  import(
    'components/HeroAboutBlock' /* webpackChunkName: "HeroAbout___page" */
  ),
);
const AbotFactBlock = lazy(() =>
  import('components/AboutFactBlock' /* webpackChunkName: "AbotFact___page" */),
);
const OurTeamBlock = lazy(() =>
  import('components/OurTeamBlock' /* webpackChunkName: "OurTeam___page" */),
);

const AboutCompanyPage = () => {
  const match = useRouteMatch();

  return (
    <>
      <Suspense
        // fallback={<h2>"Loading..."</h2>}
        fallback={<Loader />}
        // fallback={<LoaderSpinner />}
      >
        <Switch>
          <Route path={`${match.path}/about-us`}>
            <HeroAboutBlock />
            <AbotFactBlock />
          </Route>

          <Route path={`${match.path}/our-team`}>
            <OurTeamBlock />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default AboutCompanyPage;

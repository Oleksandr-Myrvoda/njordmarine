import { Suspense, lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Container from 'common/Container';
// import HeroAboutBlock from 'components/HeroAboutBlock';
// import AbotFactBlock from 'components/AboutFactBlock';
// import OurTeamBlock from 'components/OurTeamBlock';

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
    <Container>
      <Suspense fallback={<h2>"Loading..."</h2>}>
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
    </Container>
  );
};

export default AboutCompanyPage;

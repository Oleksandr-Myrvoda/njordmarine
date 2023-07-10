import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Container from 'common/Container';
import HeroAboutBlock from 'components/HeroAboutBlock';
import AbotFactBlock from 'components/AboutFactBlock';
import OurTeamBlock from 'components/OurTeamBlock';

const AboutCompanyPage = () => {
  const match = useRouteMatch();

  return (
    <Container>
      <Switch>
        <Route path={`${match.path}/about-us`}>
          <HeroAboutBlock />
          <AbotFactBlock />
        </Route>

        <Route path={`${match.path}/our-team`}>
          <OurTeamBlock />
        </Route>
      </Switch>
    </Container>
  );
};

export default AboutCompanyPage;

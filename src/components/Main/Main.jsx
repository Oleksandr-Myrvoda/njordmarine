import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// import AboutCompanyPage from 'pages/AboutCompanyPage';
// import HomePage from 'pages/HomePage';
// import ServicesListPage from 'pages/ServicesListPage';
// import SparesPage from 'pages/SparesPage';
// import ContactsPage from 'pages/ContactsPage';
// import NotFound from 'pages/NotFound';
import s from './Main.module.css';

const HomePage = lazy(() =>
  import('pages/HomePage' /* webpackChunkName: "Home___page" */),
);
const AboutCompanyPage = lazy(() =>
  import(
    'pages/AboutCompanyPage' /* webpackChunkName: "AboutCompany___page" */
  ),
);
const ServicesListPage = lazy(() =>
  import(
    'pages/ServicesListPage' /* webpackChunkName: "ServicesList___page" */
  ),
);
const SparesPage = lazy(() =>
  import('pages/SparesPage' /* webpackChunkName: "Spares___page" */),
);
const ContactsPage = lazy(() =>
  import(
    '../../pages/ContactsPage/ContactsPage' /* webpackChunkName: "Contacts___page" */
  ),
);

const Main = () => {
  return (
    <main className={s.main}>
      <Suspense fallback={<h2>"Loading..."</h2>}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />

          <Route exact path="/home">
            <HomePage />
          </Route>

          {/*--- ABOUT COMPANY ----------------------*/}
          <Route
            exact
            path="/about-company"
            render={() => <Redirect to="/about-company/about-us" />}
          />

          <Route path="/about-company">
            <AboutCompanyPage />
          </Route>

          {/*--- SERVICES ----------------------*/}
          <Route path="/services">
            <ServicesListPage />
          </Route>

          {/*--- SPARES ------------------------*/}
          <Route path="/spares">
            <SparesPage />
          </Route>

          {/*--- CONTACTS ------------------------*/}
          <Route path="/contacts">
            <ContactsPage />
          </Route>

          <Route>{/* <NotFound /> */}</Route>
        </Switch>
      </Suspense>
    </main>
  );
};

export default Main;

import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ErrorProvider } from 'context/ErrorProvider';

import s from './Main.module.css';
import Loader from 'common/Loader/Loader';
import LoaderSpinner from 'common/LoaderSpinner/LoaderSpinner';

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
  import('pages/ContactsPage' /* webpackChunkName: "Contacts___page" */),
);
const AdminPage = lazy(() =>
  import('pages/AdminPage' /* webpackChunkName: "Admin___page" */),
);

const Main = () => {
  return (
    <main className={s.main}>
      <Suspense
        // fallback={<h2>"Loading..."</h2>}
        fallback={<Loader />}
        // fallback={<LoaderSpinner />}
      >
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
            <ErrorProvider>
              <SparesPage />
            </ErrorProvider>
          </Route>

          {/*--- CONTACTS ------------------------*/}
          <Route path="/contacts">
            <ContactsPage />
          </Route>

          {/*--- ADMIN ------------------------*/}
          <Route path="/admin">
            <AdminPage />
          </Route>
        </Switch>
      </Suspense>
    </main>
  );
};

export default Main;

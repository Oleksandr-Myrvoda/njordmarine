import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { ErrorProvider } from 'context/ErrorProvider';
import Loader from 'common/Loader/Loader';
import LoaderSpinner from 'common/LoaderSpinner/LoaderSpinner';
import s from './Main.module.css';

// import NotFound from 'pages/NotFound/NotFound';

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

const NotFound = () => {
  return (
    <h1>Страница не найдена. Вы будете перенаправлены на главную страницу.</h1>
  );
};

const Main = () => {
  const location = useLocation();

  return (
    <main className={s.main}>
      <Suspense fallback={<Loader />}>
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

          {/*--- ADMIN ------------------------*/}
          <Route path="/admin">
            <AdminPage />
          </Route>

          <Route render={() => <Redirect to="/home" />} />
        </Switch>
      </Suspense>
    </main>
  );
};

export default Main;

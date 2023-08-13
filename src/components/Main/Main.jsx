import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Suspense, lazy, useState, useEffect } from 'react';

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

const Main = ({ toggleSidebar }) => {
  const location = useLocation();

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <main className={s.main}>
      {/* <div className={`${loading ? s.loaderStart : s.loaderFinish}`}>
        <Loader />
      </div> */}

      {/* <div className={`${loading ? s.contentStart : s.contentFinish}`}> */}
      {/* <div className={`${loading ? s.content : s.loadedContent}`}> */}
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />

          <Route exact path="/home">
            {/* <div className={`${loading ? s.contentStart : s.contentFinish}`}> */}
            <HomePage />
            {/* </div> */}
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
      {/* </div> */}
    </main>
  );
};

export default Main;

import './App.css';

import Footer from 'components/Footer';
import Header from 'components/Header/Header';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import { useMediaQuery } from 'react-responsive';
// import AuthProvider from 'services/AuthProvider';

// import db from '../../services/firebase';

function App() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  return (
    <div className="main-container">
      {isDesktop && <Sidebar />}
      <div className="main-wrapper">
        <Header />
        {/* <AuthProvider /> */}
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;

//
// npm install --save-dev prettier eslint
// npx mrm@2 lint-staged
// npm i @emotion/react
// npm install react-router-dom@5
// api-----------------------------------
// npm i express mongodb --save
// npm i nodemon --save-dev

// languages-----------------------------------
// npm install react-i18next i18next --save
// # if you'd like to detect user language and load translation
// npm install i18next-http-backend i18next-browser-languagedetector --save

// npm install --save-dev prop-types
// npm install react-icons --save
// npm install modern-normalize
// npm i nanoid
// npm i react-toastify
// npm install axios
// npm install --save react-spinners
// npm i react-use

// CI=false npm run build - netlify

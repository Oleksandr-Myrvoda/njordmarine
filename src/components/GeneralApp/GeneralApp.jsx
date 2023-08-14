import { Suspense, useState, useEffect, lazy, useRef } from 'react';
import PropTypes from 'prop-types';
import Loader from 'common/Loader/Loader';
import s from '../App/App.module.css';
// import App from 'components/App/App';
import { useImageLoading } from 'context/ImageLoaderProvider';

const StartLoader = ({ loading }) => {
  const imageLoading = useImageLoading();
  return (
    <div
      className={`${
        // (loading && !imageLoading.length) ||
        imageLoading ? s.loaderStart : s.loaderFinish
      }`}
    >
      <Loader />
    </div>
  );
};

// const FB = ({ setLoading }) => {
//   useEffect(() => {
//     return () => {
//       setLoading(false);
//     };
//   }, [setLoading]);
//   return null;
// };

const App = lazy(() =>
  import('components/App/App' /* webpackChunkName: "App___page" */),
);

const GeneralApp = props => {
  const [loading, setLoading] = useState(true);
  const imageLoading = useImageLoading();
  return (
    <>
      <StartLoader loading={loading} />
      {/* <Suspense fallback={<FB setLoading={setLoading} />}> */}
      <div
        className={`${
          // (loading && !imageLoading.length) ||
          imageLoading ? s.contentStart : s.contentFinish
        }`}
      >
        <App setLoading={setLoading} />
      </div>
      {/* </Suspense> */}
    </>
  );
};

GeneralApp.propTypes = {};

export default GeneralApp;

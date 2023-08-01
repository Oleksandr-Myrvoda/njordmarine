import BarLoader from 'react-spinners/BarLoader';
import s from './LoaderSpinner.module.css';

const LoaderSpinner = () => {
  return (
    <div className={s.loaderBlock}>
      <BarLoader margin={4} size={13} color={'#ff321b'} />
    </div>
  );
};

export default LoaderSpinner;

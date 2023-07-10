/** @jsxImportSource @emotion/react */
// import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
// import { useMediaQuery } from 'react-responsive';
import s from './BigButton.module.css';

// const btnStyles = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: '16px 28px',
//   border: 'none',
//   cursor: 'pointer',
//   borderRadius: '5px',
//   transition: 'all 200ms',
//   '&:not(:disabled):hover': {
//     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
//   },
//   '&:disabled': {
//     backgroundColor: '#FFE0B2',
//     cursor: 'not-allowed',
//   },
//   '& .image': {
//     marginRight: 10,
//   },
//   '& .heading': {
//     fontWeight: 600,
//   },
// };

// const defineStyles = isGray => ({
//   ...btnStyles,
//   backgroundColor: isGray ? '#EBF3FF' : '#223E7F',
//   color: isGray ? '#012756' : '#FCFCFC',
//   fontSize: isGray ? '14px' : '16px',
//   lineHeight: isGray ? '20px' : '24px',
//   width: isGray ? '182px' : '201px',
//   heigth: isGray ? '54px' : '56px',
// });

// const defineStylesWithProps = ({ bgColor = '#012756', height = 'auto', color: '#FCFCFC'}) => ({
//   ...btnStyles,
//   backgroundColor: bgColor,
//   color: color,
//   fontSize: isGray ? '14px' : '16px',
//   lineHeight: isGray ? '20px' : '24px',
//   width: isGray ? '182px' : '201px',
//   heigth: isGray ? '54px' : '56px',
// });

const BigButton = props => {
  // const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  // const { bgColor , height  } = props;
  const {
    text,
    onClick = () => {},
    type = 'button',
    disabled = false,
    // isGray = false,
    // className,
  } = props;

  // const finalStyles = defineStyles(isGray);

  return (
    <button
      // css={finalStyles}
      // className={className ? className : null}
      className={s.bigButton}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="heading">{text}</span>
    </button>
  );
};

BigButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  // isGray: PropTypes.bool,
};

export default BigButton;

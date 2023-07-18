import PropTypes from 'prop-types';
import s from './BigButton.module.css';

const BigButton = props => {
  const { text, onClick = () => {}, type = 'button', disabled = false } = props;

  return (
    <button
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
};

export default BigButton;

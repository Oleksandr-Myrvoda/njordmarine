import PropTypes from 'prop-types';
import s from './RoundButton.module.css';

const RoundButton = props => {
  const { onClick = () => {}, type = 'button', configName } = props;
  const handleClick = () => {
    onClick(configName);
  };
  return (
    <button
      type={type}
      onClick={handleClick}
      className={s.button}
      // id={id}
    ></button>
  );
};

RoundButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  id: PropTypes.string,
};

export default RoundButton;

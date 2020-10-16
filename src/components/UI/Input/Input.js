import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';
import Select from "../Select/Select";

function Input(props) {
  let input = null;
  const {inputType, label, value, elementProps} = props;

  switch (inputType) {
    case ('input'):
      input = <input className={styles.InputElement} value={value} {...elementProps}/>;
      break;
    case ('textarea'):
      input = <textarea className={styles.InputElement} value={value} {...elementProps}/>;
      break;
    case ('select'):
      input = <Select style={styles.InputElement} options={elementProps.options}/>;
      break;
    default:
      input = <input className={styles.InputElement} value={value} {...elementProps}/>;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label} htmlFor="">{label}</label>
      {input}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  elementProps: PropTypes.object.isRequired
};

export default Input;
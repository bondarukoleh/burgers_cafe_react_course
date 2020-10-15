import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

function Input(props) {
  let input = null;
  const {inputType, label, ...restProps} = props;

  switch (props.inputType) {
    case ('input'):
      input = <input className={styles.InputElement} {...restProps}/>;
      break;
    case ('textarea'):
      input = <textarea className={styles.InputElement} {...restProps}/>;
      break;
    default:
      input = <input className={styles.InputElement} {...restProps}/>;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label} htmlFor="">{props.label}</label>
      {input}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired
};

export default Input;
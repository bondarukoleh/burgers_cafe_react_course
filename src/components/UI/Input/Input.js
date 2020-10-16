import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

function Input(props) {
  let input = null;
  const {inputType, label, value, elementProps, changed} = props;
  switch (inputType) {
    case ('input'):
      input = <input className={styles.InputElement} value={value} onChange={changed} {...elementProps}/>;
      break;
    case ('textarea'):
      input = <textarea className={styles.InputElement} value={value} onChange={changed} {...elementProps}/>;
      break;
    case ('select'):
      input = <select value={value} onChange={changed} className={styles.InputElement}>
        {elementProps.options.map(({value, displayValue}) => <option key={value} value={value}>{displayValue}</option>)}
      </select>
      break;
    default:
      input = <input className={styles.InputElement} value={value} onChange={changed} {...elementProps}/>;
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
  elementProps: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      displayValue: PropTypes.string
    })),
    type: PropTypes.string
  }).isRequired,
};

export default Input;
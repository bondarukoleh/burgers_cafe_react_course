import React from 'react';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <button
      className={[styles.Button, styles[props.buttonType]].join(' ')}
      onClick={props.clickHandler}
    >{props.children}</button>
  );
}

Button.propTypes = {
  clickHandler: PropTypes.func,
  buttonType: PropTypes.string
};

export default Button;
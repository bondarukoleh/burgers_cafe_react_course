import React from 'react';
import styles from './Button.module.scss';

function Button(props) {
  return (
    <button
      className={[styles.Button, styles[props.buttonType]].join(' ')}
      onClick={props.clickHandler}
    >{props.children}</button>
  );
}

export default Button;
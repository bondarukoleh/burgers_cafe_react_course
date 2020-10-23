import React from 'react';
import styles from "./Error.module.scss";
import PropTypes from 'prop-types'

function Error(props) {
  let message = '';
  if (props.error && props.error.message) {
    message = props.error.message;
  }

  return (
    <div className={styles.Error}>
      <div className={styles.Message}>
        {`We're sorry. There is an error :( ${message}`}
      </div>
      <button onClick={props.errorConfirmed}>Got it</button>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.any,
  errorConfirmed: PropTypes.func.isRequired
}

export default Error;
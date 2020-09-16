import React from 'react';
import styles from './Spinner.module.scss'

function Spinner(props) {
  return (
    <div style={{height: '10rem'}}>
      <div className={styles.loader}/>
    </div>
  );
}

export default Spinner;
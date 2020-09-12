import React from 'react';
import logo from '../../assets/images/burger-logo.png'
import styles from './Logo.module.scss'

function Logo(props) {
  return (
    <div className={styles.Logo}>
      <img src={logo} alt="Burger"/>
    </div>
  );
}

export default Logo;
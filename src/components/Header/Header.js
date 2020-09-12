import React from 'react';
import styles from './Header.module.scss';

const Header = (props) => {
  return (
  <header className={styles.Header}>
    <div>MENU</div>
    <div>LOGO</div>
    <nav>
      <ul>
        <li>link</li>
        <li>link</li>
        <li>link</li>
      </ul>
    </nav>
  </header>
  )
};

export default React.memo(Header);
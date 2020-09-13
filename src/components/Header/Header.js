import React from 'react';
import styles from './Header.module.scss';
import Logo from "../Logo/Logo";
import NavigationItems from "./Navigation/NavigationItems/NavigationItems";

const Header = (props) => {
  return (
    <header className={styles.Header}>
      <div>MENU</div>
      <div style={{height: '100%'}}>
        <Logo/>
      </div>
      <NavigationItems/>
    </header>
  );
};

export default React.memo(Header);
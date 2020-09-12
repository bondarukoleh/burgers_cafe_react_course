import React from 'react';
import styles from './Header.module.scss';
import Logo from "../Logo/Logo";
import NavigationItems from "./Navigation/NavigationItems/NavigationItems";

const Header = (props) => {
  return (
    <header className={styles.Header}>
      <div>MENU</div>
      <Logo/>
      <NavigationItems/>
    </header>
  );
};

export default React.memo(Header);
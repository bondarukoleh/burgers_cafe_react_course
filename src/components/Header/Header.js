import React from 'react';
import styles from './Header.module.scss';
import Logo from "../Logo/Logo";
import NavigationItems from "./Navigation/NavigationItems/NavigationItems";
import MenuButton from "./MenuButton/MenuButton";

const Header = (props) => {
  return (
    <header className={styles.Header}>
      <div className={styles.Inner}>
        <MenuButton onClick={props.sideDrawerAppearance}/>
        <Logo/>
        <div className={styles.DescTopOnly}>
          <NavigationItems userAuthenticated={props.userAuthenticated}/>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
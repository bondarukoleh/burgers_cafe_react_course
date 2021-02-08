import React from 'react';
import styles from './NavigationItems.module.scss';
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems(props) {
  return (
    <nav>
      <ul className={styles.NavigationItems}>
        <NavigationItem active link="/" onClick={props.navItemClick}>Burger Builder</NavigationItem>
        {props.userAuthenticated
          ? <NavigationItem link="/orders" onClick={props.navItemClick}>Orders</NavigationItem>
          : null
        }
        {props.userAuthenticated
          ? <NavigationItem link="/logout" onClick={props.navItemClick}>Sign out</NavigationItem>
          : <NavigationItem link="/auth" onClick={props.navItemClick}>Authenticate</NavigationItem>}
      </ul>
    </nav>
  );
}

export default NavigationItems;
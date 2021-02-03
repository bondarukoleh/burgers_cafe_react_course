import React from 'react';
import styles from './NavigationItems.module.scss';
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems(props) {
  return (
    <nav>
      <ul className={styles.NavigationItems}>
        <NavigationItem active link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {props.userAuthenticated
          ? <NavigationItem link="/logout">Sign out</NavigationItem>
          : <NavigationItem link="/auth">Authenticate</NavigationItem>}
      </ul>
    </nav>
  );
}

export default NavigationItems;
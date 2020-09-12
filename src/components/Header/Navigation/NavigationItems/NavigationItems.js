import React from 'react';
import styles from './NavigationItems.module.scss';
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems(props) {
  return (
    <nav>
      <ul className={styles.NavigationItems}>
        <NavigationItem
          active
          link="/"
        >Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
      </ul>
    </nav>
  );
}

export default NavigationItems;
import React from 'react';
import styles from './NavigationItem.module.scss';
import {NavLink} from "react-router-dom";

function NavigationItem(props) {
  return (
    <li className={styles.NavigationItem} onClick={props.onClick}>
      <NavLink exact to={props.link} activeClassName={styles.active}>{props.children}</NavLink>
    </li>
  );
}

export default NavigationItem;
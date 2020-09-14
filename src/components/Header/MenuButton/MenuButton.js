import React from 'react';
import PropTypes from 'prop-types';
import styles from './MenuButton.module.scss'

MenuButton.propTypes = {};

function MenuButton(props) {
  return (
    <div className={styles.MenuBtn}>
      <input type="checkbox" id="menuToggle" onClick={props.onClick}/>
      <label htmlFor="menuToggle" >
        <span></span>
      </label>
    </div>
  );
}

export default MenuButton;
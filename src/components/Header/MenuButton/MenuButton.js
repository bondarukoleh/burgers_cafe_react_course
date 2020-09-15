import React from 'react';
import PropTypes from 'prop-types';
import styles from './MenuButton.module.scss'

MenuButton.propTypes = {
  btnCrossView: PropTypes.string
};

function MenuButton(props) {
  return (
    <div className={props.btnCrossView ? styles.CrossBtn : styles.MenuBtn}>
      <input type="checkbox" id="menuToggle" onClick={props.onClick}/>
      <label htmlFor="menuToggle" >
        <span></span>
      </label>
    </div>
  );
}

export default MenuButton;
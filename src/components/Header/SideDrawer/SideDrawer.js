import React from 'react';
import style from './SideDrawer.module.scss'
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";

const SideDrawer = (props) => {
  return (
    <div className={props.open ? style.Open : style.Closed}>
      <div style={{height: '12%', width: '100%'}}>              <Logo/>
      </div>
      <NavigationItems/>
    </div>
  );
};

export default SideDrawer;
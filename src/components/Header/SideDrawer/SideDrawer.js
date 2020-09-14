import React from 'react';
import style from './SideDrawer.module.scss';
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";

const SideDrawer = (props) => {
  let attachedClasses = [style.SideDrawer, style.Closed];
  if (props.open) {
    attachedClasses = [style.SideDrawer, style.Open];
  }

  return (
    <div className={attachedClasses.join(' ')}>
      <div className={style.Logo}>
        <Logo/>
      </div>
      <NavigationItems/>
    </div>
  );
};

export default SideDrawer;
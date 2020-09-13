import React from "react";
import Header from "../Header/Header";
import styles from './Layout.module.scss'
import SideDrawer from "../Header/SideDrawer/SideDrawer";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Header/>
      <SideDrawer open/>
      <main className={styles.content}>
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default Layout;
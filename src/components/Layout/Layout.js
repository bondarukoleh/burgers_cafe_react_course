import React, {useState} from "react";
import Header from "../Header/Header";
import styles from './Layout.module.scss';
import SideDrawer from "../Header/SideDrawer/SideDrawer";
import Shade from "../UI/Shade/Shade";

const Layout = (props) => {
  const [state, setState] = useState({showSideDrawer: true});

  const sideDrawerAppearance = () => setState((prevState => ({showSideDrawer: !prevState.showSideDrawer})));


  const renderSideDrawer = () => {
    if(state.showSideDrawer) {
      return <React.Fragment>
        <Shade onClick={sideDrawerAppearance} show={true}/>
        <SideDrawer open/>
      </React.Fragment>
    }
  }

  return (
    <React.Fragment>
      <Header sideDrawerAppearance={sideDrawerAppearance}/>
      {renderSideDrawer()}
      <main className={styles.content}>
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default Layout;
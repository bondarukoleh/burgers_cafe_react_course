import React, {useContext, useState} from "react";
import Header from "../../components/Header/Header";
import styles from './Layout.module.scss';
import SideDrawer from "../../components/Header/SideDrawer/SideDrawer";
import Shade from "../../components/UI/Shade/Shade";
import {authContext} from '../../context/auth'

const Layout = (props) => {
  const [state, setState] = useState({showSideDrawer: false});
  const {user} = useContext(authContext)

  const sideDrawerAppearance = () => setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}));

  const renderSideDrawer = () => {
    if(state.showSideDrawer) {
      return <React.Fragment>
        <Shade onClick={sideDrawerAppearance} show={true}/>
        {/* TODO: Create a context to avoid drilling */}
        <SideDrawer open navItemsClick={sideDrawerAppearance}/>
      </React.Fragment>
    }
  }

  return (
    <React.Fragment>
      <Header sideDrawerAppearance={sideDrawerAppearance} userAuthenticated={!!user}/>
      {renderSideDrawer()}
      <main className={styles.content}>
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default Layout;

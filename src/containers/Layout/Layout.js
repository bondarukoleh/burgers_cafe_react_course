import React, {useState} from "react";
import Header from "../../components/Header/Header";
import styles from './Layout.module.scss';
import SideDrawer from "../../components/Header/SideDrawer/SideDrawer";
import Shade from "../../components/UI/Shade/Shade";
import {connect} from "react-redux";

const Layout = (props) => {
  const [state, setState] = useState({showSideDrawer: false});

  const sideDrawerAppearance = () => setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}));

  const renderSideDrawer = () => {
    if(state.showSideDrawer) {
      return <React.Fragment>
        <Shade onClick={sideDrawerAppearance} show={true}/>
        {/* TODO: Create a context to avoid drilling */}
        <SideDrawer open navItemsClick={sideDrawerAppearance} userAuthenticated={props.userAuthenticated}/>
      </React.Fragment>
    }
  }

  return (
    <React.Fragment>
      <Header sideDrawerAppearance={sideDrawerAppearance} userAuthenticated={props.userAuthenticated}/>
      {renderSideDrawer()}
      <main className={styles.content}>
        {props.children}
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userAuthenticated: !!state.auth?.user?.idToken
  }
}

export default connect(mapStateToProps)(Layout);

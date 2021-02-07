import React, {Component} from 'react';
import Layout from "./Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "./Checkout/Checkout";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Auth from "./Auth/Auth";
import Orders from "./Orders/Orders";
import {connect} from 'react-redux'
import Logout from "./Auth/Logout";
import {checkUserAuthState} from '../store/actions/AuthActionCreator'

class App extends Component {
  componentDidMount() {
    this.props.checkUserAuthDataInLocalStorage();
  }

  loggedInRouts() {
    return <Switch>
      <Route path={'/checkout'} component={Checkout}/>
      <Route exact path={'/orders'} component={Orders}/>
      <Route exact path={'/logout'} component={Logout}/>
      <Route exact path={'/'} component={BurgerBuilder}/>
      <Redirect to='/' /> {/* Anything unknown will be redirected to base page */}
    </Switch>
  }

  notLoggedInRouts() {
    return <Switch>
      <Route exact path={'/auth'} component={Auth}/>
      <Route exact path={'/'} component={BurgerBuilder}/>
      <Redirect to='/' />
    </Switch>
  }

  render() {
    return (
      <Router>
        <Layout>
            {this.props.user ? this.loggedInRouts() : this.notLoggedInRouts()}
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    burger: store.burger,
    user: store.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserAuthDataInLocalStorage: () => dispatch(checkUserAuthState)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

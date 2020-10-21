import React, {Component} from 'react';
import Layout from "./Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "./Checkout/Checkout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Orders from "./Orders/Orders";
import {connect} from 'react-redux'

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path={'/checkout'} component={Checkout}/>
            <Route exact path={'/'} component={BurgerBuilder}/>
            <Route exact path={'/orders'} component={Orders}/>
          </Switch>
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    burger: store.burger
  }
}

export default connect(mapStateToProps)(App);

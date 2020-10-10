import React, {Component} from 'react';
import Layout from "./Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "./Checkout/Checkout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <Switch>
            <Route path={'/checkout'} component={Checkout}/>
            <Route path={'/'} component={BurgerBuilder}/>
          </Switch>
        </Router>
      </Layout>
    );
  }
}

export default App;

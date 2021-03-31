import React, {useEffect, Suspense} from 'react';
import Layout from "./Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Auth from "./Auth/Auth";
import {connect} from 'react-redux'
import Logout from "./Auth/Logout";
import {checkUserAuthState} from '../store/actions/AuthActionCreator'
import Spinner from "../components/Burger/Spinner/Spinner";
import ErrorProvider from "../context/error";
import PriceProvider from "../context/price";
import IngredientsProvider from "../context/ingredients";
import AuthProvider from "../context/auth";

function App ({user, checkUserAuthDataInLocalStorage}) {
  useEffect(() => checkUserAuthDataInLocalStorage(), [checkUserAuthDataInLocalStorage]);

  const loggedInRouts = () => {
    return <Switch>
      <Suspense fallback={<Spinner/>}>
        <Route path={'/checkout'} component={React.lazy(() => import('./Checkout/Checkout'))}/>
        <Route exact path={'/orders'} component={React.lazy(() => import('./Orders/Orders'))}/>
        <Route exact path={'/logout'} component={Logout}/>
        <Route exact path={'/'} component={BurgerBuilder}/>
        <Redirect to='/' /> {/* Anything unknown will be redirected to base page */}
      </Suspense>
    </Switch>
  }

  const notLoggedInRouts = () => {
    return <Switch>
      <Route exact path={'/auth'} component={Auth}/>
      <Route exact path={'/'} component={BurgerBuilder}/>
      <Redirect to='/' />
    </Switch>
  }

    return (
      <ErrorProvider>
        <AuthProvider>
          <PriceProvider>
            <IngredientsProvider>
              <Router>
                <Layout>
                  {user ? loggedInRouts() : notLoggedInRouts()}
                </Layout>
              </Router>
            </IngredientsProvider>
          </PriceProvider>
        </AuthProvider>
      </ErrorProvider>
    );
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

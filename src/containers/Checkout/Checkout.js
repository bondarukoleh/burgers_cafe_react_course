import React, {useEffect, useState} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route} from 'react-router-dom';

const Checkout = props => {
  const [state, setState] = useState({ingredients: {}, price: ''})
  useEffect(() => {
    const ingredientsQuery = new URLSearchParams(props.location.search);
    const burgerIngredients = {}
    let totalPrice;
    for(const [ingredient, amount] of ingredientsQuery.entries()){
      if (ingredient === 'price') {
        totalPrice = amount;
      } else {
        burgerIngredients[ingredient] = amount;
      }
    }
    setState({ingredients: burgerIngredients, price: totalPrice})
  }, [])

  const goBack = () => props.history.goBack();
  const checkoutContinueHandler = () => props.history.replace(`/checkout/contact-data`);
  const orderMadeHandler = () => {

  };

  return <div>
    <CheckoutSummary
      checkoutCanceled={goBack}
      checkoutContinued={checkoutContinueHandler}
      ingredients={state.ingredients}
    />;
    <Route path={`${props.match.path}/contact-data`} render={() => {
      return <ContactData
        orderCanceled={goBack}
        orderMade={orderMadeHandler}
        ingredients={state.ingredients}
        price={state.price}
      />
    }}/>
  </div>
};

export default Checkout;

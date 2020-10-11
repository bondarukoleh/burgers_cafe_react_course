import React from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout = props => {

  const ingredientsQuery = new URLSearchParams(props.location.search);
  const ingredients = {}
  for(const [ingredient, amount] of ingredientsQuery.entries()){
    ingredients[ingredient] = amount;
  }

  const checkoutCanceledHandler = () => props.history.goBack();
  const checkoutCanceledContinueHandler = () => props.history.replace('/checkout/contact-data');

  return <CheckoutSummary
    checkoutCanceled={checkoutCanceledHandler}
    checkoutContinued={checkoutCanceledContinueHandler}
    ingredients={ingredients}
  />;
};

export default Checkout;

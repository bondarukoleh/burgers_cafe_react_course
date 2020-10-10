import React from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import PropTypes from 'prop-types';

const Checkout = props => {
  const ingredients = {
    bacon: 1,
    salad: 1,
    cheese: 2,
    meat: 1
  };

  const checkoutCanceledHandler = () => props.history.goBack();
  const checkoutCanceledContinueHandler = () => props.history.replace('/checkout/contact-data');

  return <CheckoutSummary
    checkoutCanceled={checkoutCanceledHandler}
    checkoutContinued={checkoutCanceledContinueHandler}
    ingredients={ingredients}
  />;
};

Checkout.propTypes = {
  ingredients: PropTypes.array.isRequired
};

export default Checkout;

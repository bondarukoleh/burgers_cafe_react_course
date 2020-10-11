import React from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = props => {

  const ingredientsQuery = new URLSearchParams(props.location.search);
  const ingredients = {}
  for(const [ingredient, amount] of ingredientsQuery.entries()){
    ingredients[ingredient] = amount;
  }

  const goBack = () => props.history.goBack();
  const checkoutContinueHandler = () => props.history.replace('/checkout/contact-data');
  const orderMadeHandler = () => props.history.replace('/checkout/contact-data');

  return  <div>
    <CheckoutSummary
      checkoutCanceled={goBack}
      checkoutContinued={checkoutContinueHandler}
      ingredients={ingredients}
    />;
    <ContactData orderCanceled={goBack} orderMade={orderMadeHandler}/>
  </div>
};

export default Checkout;

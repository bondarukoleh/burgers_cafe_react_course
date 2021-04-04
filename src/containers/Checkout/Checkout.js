import React from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

const Checkout = props => {
  /* I'll keep this as an example of parsing */
  // const [state, setState] = useState({ingredients: {}, price: ''})
  // useEffect(() => {
  //   const ingredientsQuery = new URLSearchParams(props.location.search);
  //   const burgerIngredients = {}
  //   let totalPrice;
  //   for(const [ingredient, amount] of ingredientsQuery.entries()){
  //     if (ingredient === 'price') {
  //       totalPrice = amount;
  //     } else {
  //       burgerIngredients[ingredient] = amount;
  //     }
  //   }
  //   setState({ingredients: burgerIngredients, price: totalPrice})
  // }, [])

  const goBack = () => props.history.goBack();
  const checkoutContinueHandler = () => props.history.replace(`/checkout/contact-data`);

  return <div>
    <CheckoutSummary
      checkoutCanceled={goBack}
      checkoutContinued={checkoutContinueHandler}
      ingredients={props.ingredients}
    />;
    <Route path={`${props.match.path}/contact-data`} render={() => {
      return <ContactData
        orderCanceled={goBack}
        ingredients={props.ingredients}
        price={props.price}
      />
    }}/>
  </div>
};

const mapStateToProps = (store) => {
  return {
    ingredients: store.burger.ingredients,
    price: store.burger.price
  }
}

export default connect(mapStateToProps)(Checkout);

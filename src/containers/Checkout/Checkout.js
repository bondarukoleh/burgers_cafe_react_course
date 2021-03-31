import React, {useContext} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {ingredientsContext} from '../../context/ingredients'
import {priceContext} from '../../context/price'

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

  const {ingredients} = useContext(ingredientsContext)
  const {price} = useContext(priceContext)
  const goBack = () => props.history.goBack();
  const checkoutContinueHandler = () => props.history.replace(`/checkout/contact-data`);

  return <div>
    <CheckoutSummary
      checkoutCanceled={goBack}
      checkoutContinued={checkoutContinueHandler}
      ingredients={ingredients}
    />;
    <Route path={`${props.match.path}/contact-data`} render={() => {
      return <ContactData
        orderCanceled={goBack}
        ingredients={ingredients}
        price={price}
      />
    }}/>
  </div>
};

export default Checkout;

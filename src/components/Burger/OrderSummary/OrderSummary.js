import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const [ingredients, setIngredients] = useState(props.ingredients);

  useEffect(() => {
    setIngredients(props.ingredients)
  }, [props.ingredients])

  const renderIngredients = () => {
    return Object.entries(ingredients).map(([type, amount]) => <li key={type}><span
      style={{textTransform: 'capitalize'}}>{type}</span>: {amount}</li>);
  };

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>Delicious burger with the following ingredients:</p>
      <ul>
        {renderIngredients()}
      </ul>
      <p><b>Total price is: {props.price} $</b></p>
      <p>Continue to checkout?</p>
      <Button
        clickHandler={props.purchasingHandler}
        buttonType={'Fail'}
      >Cancel</Button>
      <Button
        clickHandler={() => {
          props.history.push({
            pathname: '/checkout',
            search: `${Object.entries({price: props.price, ...ingredients}).map(([type, amount]) => {
              return `${encodeURIComponent(type)}=${encodeURIComponent(amount)}`;
            }).join('&')}`
          });
        }}
        buttonType={'Success'}
      >Continue</Button>
    </React.Fragment>
  );
};

export default withRouter(OrderSummary);
import React from 'react';
import Button from "../../UI/Button/Button";

function OrderSummary(props) {
  const renderIngredients = () => {
    return Object.entries(props.ingredients).map(([type, amount]) => <li key={type}><span
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
        clickHandler={() => {}}
        buttonType={'Success'}
      >Continue</Button>
    </React.Fragment>
  );
}

export default OrderSummary;
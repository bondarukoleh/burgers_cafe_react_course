import React from 'react';
import styles from './OrderSummary.module.scss';

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
      <button className={styles.Success}>Continue</button>
      <button className={styles.Danger} onClick={props.purchasingHandler}>Cancel</button>
    </React.Fragment>
  );
}

export default OrderSummary;
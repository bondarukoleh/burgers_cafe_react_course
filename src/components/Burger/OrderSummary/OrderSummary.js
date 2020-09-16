import React, {Component} from 'react';
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  renderIngredients = () => {
    return Object.entries(this.props.ingredients).map(([type, amount]) => <li key={type}><span
      style={{textTransform: 'capitalize'}}>{type}</span>: {amount}</li>);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.error && alert(`There is an error, your order hasn't came thru :(`)}
        <h3>Your Order</h3>
        <p>Delicious burger with the following ingredients:</p>
        <ul>
          {this.renderIngredients()}
        </ul>
        <p><b>Total price is: {this.props.price} $</b></p>
        <p>Continue to checkout?</p>
        <Button
          clickHandler={this.props.purchasingHandler}
          buttonType={'Fail'}
        >Cancel</Button>
        <Button
          clickHandler={this.props.orderingHandler}
          buttonType={'Success'}
        >Continue</Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
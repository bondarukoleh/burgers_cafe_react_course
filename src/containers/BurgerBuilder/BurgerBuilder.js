import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Model/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import {ordersRequest} from '../../helpers/api';

const INGREDIENT_PRICES = {
  bacon: 0.50,
  salad: 0.50,
  cheese: 0.75,
  meat: 1,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      salad: 0,
      cheese: 0,
      meat: 0,
    },
    price: 0,
    purchasable: false,
    purchasing: false,
    error: null
  };

  componentDidMount = () => {
    this.countBurgerPrice();
  };

  getPurchasableState = (price) => price > 0;
  purchasingHandler = () => this.setState((prevState) => ({purchasing: !prevState.purchasing}));

  createOrder = async () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: 'Oleh',
        address: {
          street: 'Test street 1',
          zipCode: '1111AB',
          country: 'Netherlands'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fast'
    };

    try {
      const response = await ordersRequest.post('/orders.json', order);
      this.setState({purchasing: false});
    } catch (e) {
      this.setState({error: e});
      console.log(`Couldn't post the order `, e);
    }
  };

  addIngredientHandler = (type) => {
    const oldIngredients = {...this.state.ingredients};
    oldIngredients[type]++;
    this.setState((prevState) => {
      const newPrice = prevState.price + INGREDIENT_PRICES[type];
      return {price: newPrice, ingredients: oldIngredients, purchasable: this.getPurchasableState(newPrice)};
    });
  };

  removeIngredientHandler = (type) => {
    const oldIngredients = {...this.state.ingredients};
    if (!(oldIngredients[type] === 0)) {
      oldIngredients[type]--;
      this.setState((prevState) => {
        const newPrice = prevState.price - INGREDIENT_PRICES[type];
        return {price: newPrice, ingredients: oldIngredients, purchasable: this.getPurchasableState(newPrice)};
      });
    }
  };

  countBurgerPrice = () => {
    const oldPrice = this.state.price;
    const newPrice = Object.entries(this.state.ingredients)
      .reduce((newPrice, [type, amount]) => {
        newPrice += INGREDIENT_PRICES[type] * amount;
        return newPrice;
      }, 0);
    if (oldPrice !== newPrice) {
      this.setState({price: newPrice});
    }
  };

  render() {
    const disabledControls = {...this.state.ingredients};
    for (const type in disabledControls) {
      disabledControls[type] = !disabledControls[type];
    }

    return (
      <React.Fragment>
        <Modal purchasingHandler={this.purchasingHandler} show={this.state.purchasing}>
          <OrderSummary price={this.state.price}
                        ingredients={this.state.ingredients}
                        purchasingHandler={this.purchasingHandler}
                        orderingHandler={this.createOrder}
                        show={this.state.purchasing}
                        error={this.state.error}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          price={this.state.price}
          disabledControls={disabledControls}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          purchasable={this.state.purchasable}
          purchasingHandler={this.purchasingHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
export const ingredientPrices = INGREDIENT_PRICES;
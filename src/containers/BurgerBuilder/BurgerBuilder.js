import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import {ordersRequest} from '../../helpers/api';
import Spinner from "../../components/Burger/Spinner/Spinner";
import WithErrorHandler from "../../components/UI/WithErrorHandler/WithErrorHandler";
import Error from "../../components/UI/Error/Error";

const INGREDIENT_PRICES = {
  bacon: 0.50,
  salad: 0.50,
  cheese: 0.75,
  meat: 1,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {},
    price: 0,
    purchasable: false,
    purchasing: false,
    error: false,
    sendingOrder: false,
  };

  componentDidMount = async () => {
    this.countBurgerPrice();
    await this.getIngredients();
  };

  getIngredients = async () => {
    try {
      const result = await ordersRequest.get('/ingredients.json');
      if(result?.data) {
        this.setState({ingredients: result.data});
      } else {
        this.setState({error: true})
      }
    } catch (e) {
      this.setState({error: e})
      console.log(`Couldn't Get the ingredients: `, e.message);
    }
  };

  getPurchasableState = (price) => price > 0;
  purchasingHandler = () => this.setState((prevState) => ({purchasing: !prevState.purchasing}));

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

  loadingHandler = (loadingState) => this.setState({sendingOrder: loadingState});

  renderOrderSummary = () => {
    if (this.state.sendingOrder) {
      return <Spinner/>;
    }
    if (Object.keys(this.state.ingredients).length) {
      return (<OrderSummary price={this.state.price}
                            ingredients={this.state.ingredients}
                            purchasingHandler={this.purchasingHandler}
      />);
    }
    return null;
  };

  renderBurgerRelated = () => {
    if (Object.keys(this.state.ingredients).length) {
      const disabledControls = {...this.state.ingredients};
      for (const type in disabledControls) {
        disabledControls[type] = !disabledControls[type];
      }

      return (
        <React.Fragment>
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
    if (this.state.error) {
      return <Error error={this.state.error} errorConfirmed={() => {}} />;
    } else {
      return <Spinner/>;
    }
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          shadeClick={this.purchasingHandler}
          show={this.state.purchasing}>
          {this.renderOrderSummary()}
        </Modal>
        {this.renderBurgerRelated()}
      </React.Fragment>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, ordersRequest);
export const ingredientPrices = INGREDIENT_PRICES;
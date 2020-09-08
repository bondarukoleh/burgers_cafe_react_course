import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  bacon: 0.50,
  salad: 0.50,
  cheese: 0.75,
  meat: 1,
}

class BurgerBuilder extends Component {
  state =  {
      ingredients: {
        bacon: 1,
        salad: 1,
        cheese: 1,
        meat: 1,
      },
      price: 2.75
  }

  componentDidMount = () => {
    this.countBurgerPrice();
  }

  addIngredientHandler = (type) => {
      const oldIngredients = {...this.state.ingredients}
      oldIngredients[type]++;
      this.setState({ingredients: oldIngredients});
  }

  removeIngredientHandler = (type) => {
    const oldIngredients = {...this.state.ingredients}
    oldIngredients[type]--;
    this.setState({ingredients: oldIngredients});
  }

  countBurgerPrice = () => {
    const oldPrice = this.state.price;
    const newPrice = Object.entries(this.state.ingredients)
      .reduce((newPrice, [type, amount]) => {
        newPrice += INGREDIENT_PRICES[type] * amount;
        return newPrice;
      }, 0);
    if (oldPrice !== newPrice) {
      this.setState({price: newPrice})
    }
  }

  render() {
    return (
      <React.Fragment>
        <Burger
          ingredients={this.state.ingredients}
        />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
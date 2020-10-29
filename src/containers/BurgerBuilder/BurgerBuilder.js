import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/Burger/Spinner/Spinner";
import WithErrorHandler from "../../components/UI/WithErrorHandler/WithErrorHandler";
import Error from "../../components/UI/Error/Error";
import {INGREDIENT_PRICES} from "../../data/constants";
import {connect} from "react-redux";
import {addIngredient, getIngredients, removeIngredient} from "../../store/actions/burgerActionCreator";
import {axiosRequest} from "../../helpers/api";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    error: false,
    sendingOrder: false,
  };

  componentDidMount = async () => {
    this.countBurgerPrice();
    await this.props.getIngredientsForBurger();
  };

  purchasingHandler = () => this.setState((prevState) => ({purchasing: !prevState.purchasing}));

  countBurgerPrice = () => {
    const oldPrice = this.props.price;
    const newPrice = Object.entries(this.props.ingredients)
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
    if (Object.keys(this.props.ingredients).length) {
      return (<OrderSummary price={this.props.price}
                            ingredients={this.props.ingredients}
                            purchasingHandler={this.purchasingHandler}
      />);
    }
    return null;
  };

  renderBurgerRelated = () => {
    if (Object.keys(this.props.ingredients).length) {
      const disabledControls = {...this.props.ingredients};
      for (const type in disabledControls) {
        disabledControls[type] = !disabledControls[type];
      }

      return (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            price={this.props.price}
            disabledControls={disabledControls}
            addIngredient={this.props.addIngredientToBurger}
            removeIngredient={this.props.removeIngredientFromBurger}
            purchasable={this.props.price > 0}
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

const mapStateToProps = (store) => {
  return {
    ingredients: store.burger.ingredients,
    price: store.burger.price
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredientToBurger: (name) => dispatch(addIngredient(name)),
    removeIngredientFromBurger: (name) => dispatch(removeIngredient(name)),
    getIngredientsForBurger: () => dispatch(getIngredients()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axiosRequest));
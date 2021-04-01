import React, {useContext, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/Burger/Spinner/Spinner";
import WithErrorHandler from "../../components/UI/WithErrorHandler/WithErrorHandler";
import Error from "../../components/UI/Error/Error";
import {INGREDIENT_PRICES} from "../../data/constants";
// import {addIngredient, getIngredients, removeIngredient} from "../../store/actions/burgerActionCreator";
import {axiosRequest} from "../../helpers/api";
import {errorContext} from "../../context/error";
import {priceContext} from "../../context/price";
import {ingredientsContext} from "../../context/ingredients";
import {authContext} from "../../context/auth";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const {price, setPrice} = useContext(priceContext);
  const {ingredients, getIngredients, addIngredient, removeIngredient} = useContext(ingredientsContext);
  const {error, removeError} = useContext(errorContext);
  const [sendingOrder, setSendingOrder] = useState(false);
  const {user} = useState(authContext);

  const dispatch = useDispatch();
  const addIngredientToBurger = (name) => dispatch(addIngredient(name));
  const removeIngredientFromBurger = (name) => dispatch(removeIngredient(name));
  const getIngredientsForBurger = () => dispatch(getIngredients());

  const userIsAuthenticated = useSelector(state => {
    return state.userIsAuthenticated
  })


  useEffect(() => {
    countBurgerPrice();
    getIngredients();
  }, []);

  const purchasingHandler = () => setPurchasing((prevState) => !prevState);

  const countBurgerPrice = () => {
    const oldPrice = price;
    const newPrice = Object.entries(ingredients)
      .reduce((newPrice, [type, amount]) => {
        newPrice += INGREDIENT_PRICES[type] * amount;
        return newPrice;
      }, 0);
    if (oldPrice !== newPrice) {
      setPrice(newPrice)
    }
  };

  const renderOrderSummary = () => {
    if (sendingOrder) {
      return <Spinner/>;
    }
    if (Object.keys(ingredients).length) {
      return (<OrderSummary price={price}
                            ingredients={ingredients}
                            purchasingHandler={purchasingHandler}
      />);
    }
    return null;
  };

  const renderBurgerRelated = () => {
    if (Object.keys(ingredients).length) {
      const disabledControls = {...ingredients};
      for (const type in disabledControls) {
        disabledControls[type] = !disabledControls[type];
      }

      return (
        <React.Fragment>
          <Burger ingredients={ingredients}/>
          <BuildControls
            price={price}
            disabledControls={disabledControls}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            purchasable={price > 0}
            purchasingHandler={purchasingHandler}
            isAuthenticated={!!user}
          />
        </React.Fragment>
      );
    }
    if (error) {
      return <Error error={error} errorConfirmed={removeError}/>;
    } else {
      return <Spinner/>;
    }
  };

  return (
    <WithErrorHandler axios={axiosRequest}>
      <Modal
        shadeClick={purchasingHandler}
        show={purchasing}>
        {renderOrderSummary()}
      </Modal>
      {renderBurgerRelated()}
    </WithErrorHandler>
  );
};

const mapStateToProps = (store) => {
  return {
    userIsAuthenticated: !!store.auth.user
  };
};

export default connect(mapStateToProps)(BurgerBuilder);

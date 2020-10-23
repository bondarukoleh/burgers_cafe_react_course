import {Actions} from '../actions/ActionConstants';
import {INGREDIENT_PRICES} from "../../data/constants";

const initialState = {
  ingredients: {},
  price: 0,
};

export function burgerReducer(state = initialState, action) {
  let newState = null;
  let newIngredients = null;

  switch (action.type) {
    case Actions.ingredientGot:
      newState = {...state};
      newIngredients = action.payload
      newState.ingredients = newIngredients
      return newState;
    case Actions.ingredientAdded:
      newState = {...state};
      newIngredients = {...newState.ingredients}
      newIngredients[action.payload]++;
      newState.ingredients = newIngredients
      newState.price += INGREDIENT_PRICES[action.payload];
      return newState;
    case Actions.ingredientRemoved:
      newState = {...state};
      newIngredients = {...newState.ingredients}
      newIngredients[action.payload]--;
      newState.ingredients = newIngredients
      newState.price -= INGREDIENT_PRICES[action.payload];
      return newState;
    default:
      return state;
  }
}
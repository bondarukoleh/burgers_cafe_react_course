import {Actions} from '../actions/ActionConstants';
import {INGREDIENT_PRICES} from "../../data/constants";

const initialState = {
  ingredients: {},
  price: 0,
};

export function burgerReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.ingredientGot:
      return {
        ...state,
        ingredients: {
          ...action.payload
        }
      }
    case Actions.ingredientAdded:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: ++state.ingredients[action.payload]
        },
        price: state.price + INGREDIENT_PRICES[action.payload]
      }
    case Actions.ingredientRemoved:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: --state.ingredients[action.payload]
        },
        price: state.price - INGREDIENT_PRICES[action.payload]
      }
    default:
      return state;
  }
}
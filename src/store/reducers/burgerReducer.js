import {Actions} from '../actions/ActionConstants'

const initialState = {
  ingredients: {},
  price: 0,
};

export function burgerReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.ingredientAdded:
      const newState = {...state};
      const newIngredients = {...newState.ingredients}
      newIngredients[action.payload.ingredient] = action.payload.amount;
      newState.ingredients = newIngredients
      return newState;
    default:
      return state;
  }
}
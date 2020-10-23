import {Actions} from './ActionConstants';
import {ordersRequest} from "../../helpers/api";

const getIngredients = () => async (dispatch) => {
  try {
    const result = await ordersRequest.get('/ingredients.json');
    if(result?.data) {
      dispatch({
        type: Actions.ingredientGot,
        payload: result.data
      });
    } else {
      dispatch({
        type: Actions.error,
        error: true
      })
    }
  } catch (e) {
    dispatch({
      type: Actions.error,
      error: e
    })
  }
}

const addIngredient = (ingredientName) => (dispatch) => {
  dispatch({
    type: Actions.ingredientAdded,
    payload: ingredientName
  });
};

const removeIngredient = (ingredientName) => (dispatch) => {
  dispatch({
    type: Actions.ingredientRemoved,
    payload: ingredientName
  });
};

export {addIngredient, removeIngredient, getIngredients};
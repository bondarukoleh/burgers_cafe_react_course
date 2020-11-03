import {Actions} from './ActionConstants';
import {axiosRequest} from "../../helpers/api";

const getIngredients = () => async (dispatch) => {
  try {
    const result = await axiosRequest.get('/ingredients.json');
    if(result?.data) {
      dispatch({
        type: Actions.ingredientGot,
        payload: result.data
      });
    } else {
      dispatch({
        type: Actions.errorOccurred,
        payload: true
      })
    }
  } catch (e) {
    dispatch({
      type: Actions.errorOccurred,
      payload: e
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
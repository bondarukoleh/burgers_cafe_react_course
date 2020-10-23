import {Actions} from './ActionConstants';
import {ordersRequest} from "../../helpers/api";

const errorOccurred = (e = {message: "Unknown Error"}) => (dispatch) => {
  dispatch({
    type: Actions.error,
    payload: e
  })
};

const removeError = _ => (dispatch) => {
  dispatch({
    type: Actions.error,
    payload: null
  })
};

export {errorOccurred, removeError};
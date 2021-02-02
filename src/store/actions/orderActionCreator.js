import {Actions} from './ActionConstants';
import {axiosRequest} from "../../helpers/api";

const sendOrder = (token, {id, order}) => async (dispatch) => {
  dispatch({type: Actions.orderSendingState, payload: true})
  try {
    await axiosRequest.post(`/orders.json?auth=${token}`, order);
    dispatch({type: Actions.orderSendingState, payload: false})
    dispatch({type: Actions.orderSentSuccess, payload: {id, order}})
  } catch (e) {
    dispatch({type: Actions.orderSendingState, payload: false})
    dispatch({type: Actions.orderSentFail, payload: {id, order}})
    dispatch({type: Actions.errorOccurred, payload: e})
    console.log(`Couldn't post the order `, e.message);
  }
};

export {sendOrder};
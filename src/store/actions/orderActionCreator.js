import {Actions} from './ActionConstants';
import {ordersRequest} from "../../helpers/api";

const sendOrder = (id, order) => async (dispatch) => {
  dispatch({type: Actions.orderSendingState, payload: true})
  try {
    await ordersRequest.post('/orders.json', order);
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
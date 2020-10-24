import {Actions} from '../actions/ActionConstants';

export function orderReducer(state = {loading: false}, action) {
  switch (action.type) {
    case Actions.orderSendingState:
      return {...state, loading: action.payload};
    default:
      return state;
  }
}
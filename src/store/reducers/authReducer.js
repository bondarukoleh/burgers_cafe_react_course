import {Actions} from '../actions/ActionConstants';

const initialState = {
  user: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.userLogin:
      return {
        ...state,
        user: action.payload
      }
    case Actions.userLogout:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}
import {Actions} from '../actions/ActionConstants';

export function errorReducer(state = null, action) {
  switch (action.type) {
    case Actions.errorOccurred:
      return action.payload;
    case Actions.errorRemoved:
      return action.payload;
    default:
      return state;
  }
}
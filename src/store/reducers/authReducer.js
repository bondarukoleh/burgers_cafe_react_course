import {Actions} from '../actions/ActionConstants';

const initialState = {
  user: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.userSignIn:
      const {idToken, kind, localId, refreshToken} = action.payload;
      return {
        ...state,
        user: {idToken, kind, refreshToken, localId}
      };
    case Actions.userSighOut:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
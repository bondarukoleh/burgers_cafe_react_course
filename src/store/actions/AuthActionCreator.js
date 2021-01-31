import {Actions} from './ActionConstants';
import {signUpRequest, signInRequest} from "../../helpers/api";

const loginUser = (userData, signIn) => async (dispatch) => {
  try {
    const result = signIn
      ? await signInRequest.post('',{returnSecureToken: true, ...userData})
      : await signUpRequest.post('',{returnSecureToken: true, email: userData.email, password: userData.password});
    if(result?.data) {
      dispatch({
        type: Actions.userSignIn,
        payload: result.data
      });
      // checkAuthExpirationTime(result.data.)
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

const logoutUser = () => (dispatch) => {
  dispatch({
    type: Actions.userSighOut
  })
}

const checkAuthExpirationTime = (expirationTime) => {
  setTimeout(() => {
    logoutUser();
  }, expirationTime);
};

export {loginUser, checkAuthExpirationTime, logoutUser}
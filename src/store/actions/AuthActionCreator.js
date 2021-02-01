import {Actions} from './ActionConstants';
import {signUpRequest, signInRequest} from "../../helpers/api";

const loginUser = (userData, signIn) => async (dispatch) => {
  try {
    const result = signIn
      ? await signInRequest.post('',{returnSecureToken: true, ...userData})
      : await signUpRequest.post('',{returnSecureToken: true, email: userData.email, password: userData.password});
    if(result?.data) {
      console.log(result);
      dispatch({
        type: Actions.userSignIn,
        payload: result.data
      });
      dispatch(setLogoutExpirationTime(result.data.expiresIn))
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

const logoutUser = (dispatch) => {
  dispatch({
    type: Actions.userSighOut
  })
}

const setLogoutExpirationTime = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    logoutUser(dispatch)
  }, expirationTime * 1000);
};

export {loginUser, setLogoutExpirationTime, logoutUser}
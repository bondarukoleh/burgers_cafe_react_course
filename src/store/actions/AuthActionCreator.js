import {Actions} from './ActionConstants';
import {signUpRequest, signInRequest} from "../../helpers/api";

const authenticateUser = (result) => (dispatch) => {
  dispatch({
    type: Actions.userSignIn,
    payload: result
  });
  // TODO: Figure out this
  // dispatch(setLogoutExpirationTime(result.expiresIn))
};

const setLocalStorageUserAuthData = (userData) => {
  for (const [key, value] of Object.entries(userData)) {
    localStorage.setItem(key, value);
  }
};

const loginUser = (userData, signIn) => async (dispatch) => {
  try {
    const result = signIn
      ? await signInRequest.post('', {returnSecureToken: true, email: userData.email, password: userData.password})
      : await signUpRequest.post('', {returnSecureToken: true, email: userData.email, password: userData.password});
    if (result?.data) {
      dispatch(authenticateUser(result.data));
      let {idToken, kind, localId, refreshToken, expiresIn} = result.data;
      expiresIn = expiresIn + Date.now();
      setLocalStorageUserAuthData({idToken, kind, localId, refreshToken, expiresIn});
    } else {
      dispatch({type: Actions.errorOccurred, payload: {message: `WE don't have data for this user`}});
    }
  } catch (e) {
    dispatch({type: Actions.errorOccurred, payload: e});
  }
};

const logoutUserInitiated = (dispatch) => {
  /* localStorage.clear() moved that side effect to logoutSaga */
  dispatch({
    type: Actions.userInitiateSighOut
  });
};

const logoutUserSucceed = () => {
  return {
    type: Actions.userSighOut
  };
};

const checkUserAuthState = async (dispatch) => {
  const idToken = localStorage.getItem('idToken');
  if (idToken) {
    // if (Date.now() > localStorage.getItem('expiresIn')) {
    //   /* logout is token is expired */
    //   dispatch(logoutUserInitiated);
    // } else {
      const userData = {};
      for (const key of ['idToken', 'kind', 'localId', 'refreshToken', 'expiresIn']) {
        userData[key] = localStorage.getItem(key);
      }
      dispatch(authenticateUser(userData));
    // }
  }
};

const setLogoutExpirationTime = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    // TODO: fix bug with expiration time
    logoutUserInitiated(dispatch);
  }, 3600 * 1000);
};

export {loginUser, setLogoutExpirationTime, logoutUserInitiated, logoutUserSucceed, checkUserAuthState};

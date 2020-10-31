import {Actions} from './ActionConstants';
import {loginRequest} from "../../helpers/api";

const loginUser = (userData) => async (dispatch) => {
  try {
    const result = await loginRequest.post('',{returnSecureToken: true, ...userData});
    if(result?.data) {
      dispatch({
        type: Actions.userLogin,
        payload: result.data
      });
    } else {
      dispatch({
        type: Actions.errorOccurred,
        error: true
      })
    }
  } catch (e) {
    dispatch({
      type: Actions.errorOccurred,
      error: e
    })
  }
}

const logoutUser = () => (dispatch) => {
  console.log('Logout')
  dispatch({
    type: Actions.userLogout
  })
}

export {loginUser, logoutUser}
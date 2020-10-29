import {Actions} from './ActionConstants';
import {axiosRequest} from "../../helpers/api";

const loginUser = (userData) => async (dispatch) => {
  try {
    const result = await axiosRequest.post('/users.json', userData);
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
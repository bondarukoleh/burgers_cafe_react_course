import {Actions} from './ActionConstants';

const errorOccurred = (e = {message: "Unknown Error"}) => (dispatch) => {
  console.log('AAAAAAAAAAAAAAAAAA')
  dispatch({
    type: Actions.errorOccurred,
    payload: e
  })
};

const removeError = _ => (dispatch) => {
  dispatch({
    type: Actions.errorRemoved,
    payload: null
  })
};

export {errorOccurred, removeError};

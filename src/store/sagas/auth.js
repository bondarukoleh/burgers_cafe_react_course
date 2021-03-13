import {put} from 'redux-saga/effects'
import {logoutUserSucceed} from '../actions/AuthActionCreator';

function* logoutSaga(dispatchedAction) {
  yield localStorage.clear();
  yield put(logoutUserSucceed());
}

export {logoutSaga}

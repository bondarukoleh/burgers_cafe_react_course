import {takeEvery} from 'redux-saga/effects'

import {logoutSaga} from './auth';
import {Actions} from '../actions/ActionConstants'

function* watchAuth() {
  yield takeEvery(Actions.userInitiateSighOut, logoutSaga)
}

export {watchAuth}

import {combineReducers} from 'redux';
import {burgerReducer} from './burgerReducer';
import {errorReducer} from "./errorReducer";

export const rootReducer = combineReducers({
  burger: burgerReducer,
  error: errorReducer
});
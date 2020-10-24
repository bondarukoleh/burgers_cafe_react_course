import {combineReducers} from 'redux';
import {burgerReducer} from './burgerReducer';
import {errorReducer} from "./errorReducer";
import {orderReducer} from "./orderReducer";

export const rootReducer = combineReducers({
  burger: burgerReducer,
  error: errorReducer,
  order: orderReducer
});
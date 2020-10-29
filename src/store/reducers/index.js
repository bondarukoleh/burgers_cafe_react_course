import {combineReducers} from 'redux';
import {burgerReducer} from './burgerReducer';
import {errorReducer} from "./errorReducer";
import {orderReducer} from "./orderReducer";
import {authReducer} from "./authReducer";

export const rootReducer = combineReducers({
  burger: burgerReducer,
  error: errorReducer,
  order: orderReducer,
  auth: authReducer,
});
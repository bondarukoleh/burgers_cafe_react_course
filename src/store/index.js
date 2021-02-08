import {createStore, applyMiddleware, compose} from 'redux';
import {rootReducer} from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
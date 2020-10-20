import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './containers/App';
import * as serviceWorker from './helpers/serviceWorker';
import {createStore} from 'redux'
import {Provider} from 'react-redux';

const reducer = (state = {initial: 0}, action) => {
  if(action.type === 'SOME_ACTION') {
    return {...state, someProp: action.payload}
  }
  return state
}

const store = createStore(reducer);

store.subscribe(() => {
  console.log('we have a new state ', store.getState())
})

store.dispatch({type: 'SOME_ACTION', payload: 'someValue'});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

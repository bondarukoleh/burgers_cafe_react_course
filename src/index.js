import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './containers/App';
import * as serviceWorker from './helpers/serviceWorker';
import {Provider} from 'react-redux';
import {store} from './store';
import AuthProvider from "./context/auth";
import ErrorProvider from "./context/error";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

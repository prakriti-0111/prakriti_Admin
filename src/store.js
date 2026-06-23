/*import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
    : applyMiddleware(thunk),
);

export default store;*/



import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// middleware to support dispatching plain Promises (e.g. axios calls)
const promiseMiddleware = (storeAPI) => (next) => (action) => {
  // If a Promise is dispatched, wait for it to resolve.
  // Only forward to next() if the resolved value is a valid action (has a `type`).
  if (action && typeof action.then === 'function') {
    return action.then((resolved) => {
      if (resolved && typeof resolved === 'object' && resolved.type) {
        return next(resolved);
      }
      // If resolved value is not an action, just return it to the caller.
      return resolved;
    });
  }
  return next(action);
};

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promiseMiddleware, thunk))
);

export default store;
/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from 'Utility/history';
import * as formsReducers from './forms';
import enhancersReducer from './enhancers';
// @generator reducers:import

export const makeRootReducer = asyncReducers => combineReducers({
  // @generator reducers:combine
  enhancers: enhancersReducer,
  router: connectRouter(history),
  ...formsReducers,
  ...asyncReducers,
});

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

export const injectReducer = (store, { key, asyncReducer }) => {
  if (Reflect.has(store.asyncReducers, key)) return;

  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;

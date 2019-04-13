import { combineReducers } from 'redux';
// @generator reducers:import

export const makeRootReducer = injectedReducers => combineReducers({
  // @generator reducers:combine
  ...injectedReducers,
});

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.injectedReducers, key)) return;

  store.injectedReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.injectedReducers));
};

export default makeRootReducer;

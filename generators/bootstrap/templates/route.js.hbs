import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import history from 'Utility/history';
import loggerMiddleware from './middleware/logger';
import monitorReducerEnhancer from './enhancers/monitorReducers';
import createReducer from './reducers';
import { rootSaga } from './sagas';

const immutableStateInvariantMiddleware = require('redux-immutable-state-invariant').default();

const composeEnhancers = composeWithDevTools({
  trace: true, traceLimit: 25, serialize: { options: { undefined: true, function(fn) { return fn.toString(); } } } });
const sagaMiddleware = createSagaMiddleware();

const rootStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================

  const middlewares = [sagaMiddleware, thunkMiddleware, routerMiddleware(history)];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(immutableStateInvariantMiddleware, loggerMiddleware);
  }

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [applyMiddleware(...middlewares), monitorReducerEnhancer];

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    createReducer(),
    initialState,
    process.env.NODE_ENV === 'development' ? composeEnhancers(...enhancers) : compose(...enhancers),
  );

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const defaultReducers = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(defaultReducers(store.asyncReducers));
    });
  }
  store.runSaga = sagaMiddleware.run;
  store.injectedSagas = new Map();
  store.runSaga(rootSaga);

  return store;
};

export default rootStore();

import { all } from 'redux-saga/effects';
// @generator sagas:import

export default function* root() {
  yield all([
    // @generator sagas:export
  ]);
}

export function injectSaga(store, { key, saga }) {
  const hasSaga = Reflect.has(store.injectedSagas, key);
  if (!hasSaga) {
    /* eslint-disable no-param-reassign */
    store.injectedSagas[key] = store.runSaga(saga);
    /* eslint-enable no-param-reassign */
  }
}

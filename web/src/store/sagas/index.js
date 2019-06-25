import { all } from 'redux-saga/effects';
// @generator sagas:import

export default function* root() {
  yield all([
    // @generator sagas:export
  ]);
}

export function injectSaga(store, { key, saga }) {
  const isInjected = k => store.injectedSagas.has(k);
  if (isInjected(key)) return;
  const task = store.runSaga(saga);
  store.injectedSagas.set(key, task);
}

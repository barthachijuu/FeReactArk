/**
 * index.jsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator supportimport '@babel/polyfill';
import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { addLocaleData } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as it from 'react-intl/locale-data/it';
import MainContainer from './containers/MainContainer';
import store from './store/createStore';

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  require('offline-plugin/runtime').install();
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');
const authRoutes = require('./routes/index').default(store);
const noauthRoutes = require('./routes/index').createUnauthRoutes(store);

// React INTL

addLocaleData([...it, ...en]);

moment.locale('it');

const render = () => {
  ReactDOM.render(
    <MainContainer store={store} authRoutes={authRoutes} noauthRoutes={noauthRoutes} />,
    MOUNT_NODE,
  );
};
// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    // Setup hot module replacement
    module.hot.accept('./routes/index', () => setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    }));
  }
}
render();

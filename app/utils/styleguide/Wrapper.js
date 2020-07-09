// src/styleguide/Wrapper.js
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'Root/app/styles/themes/theme.js';
import createReducer from 'Root/app/store/reducers';

const store = createStore(createReducer());

/* eslint-disable */

export default class Wrapper extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme.muiTheme}>
        <Provider store={store}>
          <Router>
            <IntlProvider locale="it">{this.props.children}</IntlProvider>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

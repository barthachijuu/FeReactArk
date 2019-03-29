import React from 'react';
import { injectReducer } from 'Store/reducers';
import rootStore from 'Store/createStore';
import { injectSaga } from 'Store/sagas';

export default function asyncComponent(getComponent, componentName) {
  class AsyncComponent extends React.Component {
      static Component = null;

      state = { Component: AsyncComponent.Component };

      componentWillMount() {
        if (!this.state.Component) {
          getComponent().then((Component) => {
            AsyncComponent.Component = Component;
            this.setState({ Component });
          });
        }
      }

      render() {
        const { Component } = this.state;
        import(`Route/${componentName}/modules/${componentName}Reducers`)
          .then(({ default: reducer }) => {
            if (reducer !== undefined) {
              injectReducer(rootStore, { key: componentName, reducer });
            }
          });
        import(`Route/${componentName}/modules/${componentName}Sagas`)
          .then(({ default: saga }) => {
            if (saga !== undefined) {
              injectSaga(rootStore, { key: `${componentName}`, saga });
            }
          });
        if (Component) {
          return <Component {...this.props} />;
        }
        return null;
      }
  }
  return AsyncComponent;
}

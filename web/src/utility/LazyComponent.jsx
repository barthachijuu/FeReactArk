import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Components } from 'Route';
import rootStore from 'Store/createStore';
import { injectReducer } from 'Store/reducers';
import { injectSaga } from 'Store/sagas';

export const LazyComponent = (props) => {
  const { componentName } = props;
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
  const Component = Components[componentName];
  return (
    <Suspense fallback="<div>Loading...</div>">
      <Component {...props} />
    </Suspense>
  );
};

LazyComponent.propTypes = {
  componentName: PropTypes.string.isRequired,
};

export default LazyComponent;

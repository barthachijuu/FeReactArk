/*
 *
 * ErrorBoundary
 *
 * this component make react errors more readable
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { create } from 'jss';

const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  bigBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(149, 150, 175, 0.3)',
  },
  detailsButton: {
    whiteSpace: 'pre-wrap',
    outline: 'none',
    marginTop: '20px',
  },
  detailsButton_focus: {
    outline: 'none',
  },
};
const jss = create();
const { classes } = jss.createStyleSheet(styles).attach();

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorType: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      errorType: error,
      errorInfo: info,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className={classes.bigBody}>
            <div className={classes.body}>
              <h2>Something went wrong.</h2>
              {this.state.errorType && this.state.errorType.toString()}
              <br />
              <details className={classes.detailsButton}>
                {this.state.errorInfo ? this.state.errorInfo.componentStack : <h3>Sorry, no more details</h3>}
              </details>
            </div>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element,
};

ErrorBoundary.defaultProps = {
  children: React.createElement('div'),
};

export default ErrorBoundary;

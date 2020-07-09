/**
 *
 * Jest Unit Test for
 * enhancers Redux Modules
 *
 */

import enhancersReducer from '../enhancers';

describe('reducers', () => {
  it('should create a sample test', () => {
    console.log(enhancersReducer);
    const text = 'Set state on reducer';
    expect(text).toEqual('Set state on reducer');
  });
});

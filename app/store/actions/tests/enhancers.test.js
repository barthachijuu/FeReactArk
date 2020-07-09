/**
 *
 * Jest Unit Test for
 *  Redux Action
 *
 */

import { actionTypes } from '../enhancers';

describe('actions', () => {
  it('should create a sample test', () => {
    console.log(actionTypes);
    const text = 'Action creator';
    expect(text).toEqual('Action creator');
  });
});

/**
 *
 * Jest Unit Test for
 * enhancers Redux Modules
 *
 */

import enhancersReducer from '../enhancers';
import { actionTypes } from '../../actions/enhancers';


describe('reducers', () => {
  it('should create a sample test', () => {
    console.log(enhancersReducer);
    const text = 'Set state on reducer';
    expect(text).toEqual('Set state on reducer');
  });
  it('should return the idle state', () => {
    expect(enhancersReducer(undefined, {
      type: actionTypes.STATUS_IDLE,
      payload: 'idle',
    })).toEqual([{
      status: 'idle',
    }]);
  });
});

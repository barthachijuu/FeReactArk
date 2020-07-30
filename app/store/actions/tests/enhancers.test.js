/**
 *
 * Jest Unit Test for
 *  Redux Action
 *
 */

import * as actions from '../enhancers';

describe('actions', () => {
  it('should create an action to set the status idle', () => {
    const payload = 'idle';
    const expectedAction = {
      type: actions.actionTypes.STATUS_IDLE,
      payload,
    };
    expect(actions.doStatusIdle(payload)).toEqual(expectedAction);
  });
  it('should create an action to set the status loading', () => {
    const payload = 'loading';
    const expectedAction = {
      type: actions.actionTypes.STATUS_LOADING,
      payload,
    };
    expect(actions.doStatusLoading(payload)).toEqual(expectedAction);
  });
  it('should create an action to set the status success', () => {
    const payload = 'success';
    const expectedAction = {
      type: actions.actionTypes.STATUS_SUCCESS,
      payload,
    };
    expect(actions.doStatusSuccess(payload)).toEqual(expectedAction);
  });
  it('should create an action to set the status failure', () => {
    const payload = 'failure';
    const expectedAction = {
      type: actions.actionTypes.STATUS_FAILURE,
      payload,
    };
    expect(actions.doStatusFailure(payload)).toEqual(expectedAction);
  });
});

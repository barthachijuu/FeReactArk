/*
 *
 * enhancers Actions
 *
 * @version 1.0.0
 * @author Bartolo Amico
 * @since 05-May-2020
 */

import { createAction } from './index';

export const actionTypes = {
  STATUS_IDLE: 'enhancers/status_idle',
  STATUS_LOADING: 'enhancers/status_loading',
  STATUS_SUCCESS: 'enhancers/status_success',
  STATUS_FAILURE: 'enhancers/status_failure',
  // @generator action:type
  // @generator action:type:request
};

// ------------------------------------
// Actions
// ------------------------------------
// @generator action:request

/** @action
 * * Insert a description
 * @name StatusIdle
 * @return {object} - The payload object
 */
export const doStatusIdle = payload => createAction(actionTypes.STATUS_IDLE, { payload });


/** @action
 * * Insert a description
 * @name StatusLoading
 * @return {object} - The payload object
 */
export const doStatusLoading = payload => createAction(actionTypes.STATUS_LOADING, { payload });


/** @action
 * * Insert a description
 * @name StatusSuccess
 * @return {object} - The payload object
 */
export const doStatusSuccess = payload => createAction(actionTypes.STATUS_SUCCESS, { payload });


/** @action
 * * Insert a description
 * @name StatusFailure
 * @return {object} - The payload object
 */
export const doStatusFailure = payload => createAction(actionTypes.STATUS_FAILURE, { payload });

// @generator action

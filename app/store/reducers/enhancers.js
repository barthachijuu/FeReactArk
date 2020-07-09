/*
 * enhancersReducer
 * Description
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 * @version 1.0.0
 * @author Bartolo Amico
 * @since 05-May-2020
 */
import produce from 'immer';
import { actionTypes } from '../actions/enhancers';

const ACTION_HANDLERS = {
  [actionTypes.STATUS_IDLE]: produce((draft) => {
    draft.status = 'idle';
  }),
  [actionTypes.STATUS_LOADING]: produce((draft) => {
    draft.status = 'loading';
  }),
  [actionTypes.STATUS_SUCCESS]: produce((draft) => {
    draft.status = 'success';
  }),
  [actionTypes.STATUS_FAILURE]: produce((draft) => {
    draft.status = 'failure';
  }),
  // @generator reducer:type:action

};

// The initial state of the enhancers
const initialState = {
  error: '',
  status: 'idle',
};


const enhancers = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default enhancers;

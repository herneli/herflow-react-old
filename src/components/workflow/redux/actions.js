import { createAction } from 'redux-actions';
import fakeWorkflow from '../fakeWorkflow';

// Action constants
export const SET_CURRENT_WORKFLOW = "SET_CURRENT_WORKFLOW";
export const SET_ACTIVITY_CLIPBOARD = "SET_ACTIVITY_CLIPBOARD";

// Pure action definitions
export const setCurrentWorkflow = createAction(SET_CURRENT_WORKFLOW, (workflow) => workflow);
export const setActivityClipboard = createAction(SET_ACTIVITY_CLIPBOARD, (activity) => activity);

export function loadFakeWorkflow() {
  return (dispatch, getState) => {
      dispatch(setCurrentWorkflow(fakeWorkflow));
  };
}
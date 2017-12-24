import { createAction } from 'redux-actions';
import HttpClient from '../../../common/HttpClient';
import fakeWorkflow from './fakeWorkflow';

// Action constants
export const SET_CURRENT_WORKFLOW = "SET_CURRENT_WORKFLOW";

// Pure action definitions
export const setCurrentWorkflow = createAction(SET_CURRENT_WORKFLOW, (workflow) => workflow);

export function loadFakeWorkflow() {
  return (dispatch, getState) => {
      dispatch(setCurrentWorkflow(fakeWorkflow));
  };
}
import { handleActions } from 'redux-actions';
import { 
    SET_CURRENT_WORKFLOW, 
    SET_EDIT_ACTIVITY,
    SET_ACTIVITY_CLIPBOARD
} from './actions';
import _ from 'lodash';

const initialState = {
    activeWorkflow: null,
    editType: null,
    editActivity: null,
    editWorkflow: null
};

export default handleActions({
    [SET_CURRENT_WORKFLOW]: (state, action) => {
        return _.assign({}, state, { activeWorkflow: action.payload });
    },
    [SET_ACTIVITY_CLIPBOARD]: (state, action) => {
        return _.assign({}, state, { activityClipboard: action.payload });
    },   
    [SET_EDIT_ACTIVITY]: (state, action) => {
        return _.assign({}, state, { 
            editType: action.payload ? "Activity" : null,
            editActivity: action.payload 
        });
    },        
}, initialState);

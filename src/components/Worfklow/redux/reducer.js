import { handleActions } from 'redux-actions';
import { SET_CURRENT_WORKFLOW } from './actions';
import _ from 'lodash';

const initialState = {
    activeWorkflow: null
};

export default handleActions({
    [SET_CURRENT_WORKFLOW]: (state, action) => {
        return _.assign({}, state, { activeWorkflow: action.payload });
    }
}, initialState);

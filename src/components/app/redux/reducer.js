import { handleActions } from 'redux-actions';
import { SET_USER_SETTINGS } from './actions';
import _ from 'lodash';

const initialState = {
    userSettings: {}
};

export default handleActions({
    [SET_USER_SETTINGS]: (state, action) => {
        return _.assign({}, state, { userSettings: action.payload });
    }
}, initialState);

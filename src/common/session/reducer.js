import { handleActions } from 'redux-actions';
import {SET_SESSION, SET_LANGUAGE, SET_MESSAGE, LOGOUT} from './actions';
import {setTokens,getSessionInfo,setLanguage} from './SessionHelper';
import _ from 'lodash';

const initialState = getSessionInfo();

export default handleActions({
    // Set state
    [SET_SESSION]: (state, action) => {
        setTokens(action.payload);
        let session = getSessionInfo();
        return session;
    },
    [LOGOUT]: (state, action) => {
        setTokens(null);
        let session = getSessionInfo();
        return session;
    },  
    [SET_LANGUAGE]: (state, action) => {
        setLanguage(action.payload);
        return _.assign({},state,{language: action.payload});
    },   
    [SET_MESSAGE]: (state, action) => {
        return _.assign({},state,{message: action.payload});
    },   
}, initialState);
 
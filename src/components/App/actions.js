import { createAction } from 'redux-actions';
import HttpClient from '../../common/HttpClient';

// Action constants
export const SET_USER_SETTINGS = "SET_USER_SETTINGS";

// Pure action definitions
//export const addCommunication = createAction(ADD_COMMUNICATION, (communication) => communication);
export const setUserSettings = createAction(SET_USER_SETTINGS, (userSettings) => userSettings);

// Thunk action definitions
export function getUserSettings() {
    return (dispatch, getState) => {
        HttpClient.callRedux(dispatch, {
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/userSettings'
        },function (error,response,body) {
            if (error){
                console.log(error);
            }else{
                dispatch(setUserSettings(body));
            }
        });
    };
}


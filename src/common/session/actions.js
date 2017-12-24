import { createAction } from 'redux-actions';
// Action constants
export const SET_SESSION = 'SET_SESSION';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_MESSAGE = 'SET_MESSAGE';
export const LOGOUT = 'LOGOUT';

// Action definitions
export const setSession = createAction(SET_SESSION, (tokens) => tokens);
export const setLanguage = createAction(SET_LANGUAGE, (language) => language);
export const setMessage = createAction(SET_MESSAGE, (message) => message);
export const logout = createAction(LOGOUT);

export function refreshTokens(){
  return (dispatch, getState) => {
    if (!window.gapi){
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/platform.js";
      script.async = true;
      script.onload = () => doLogout(dispatch);
      document.body.appendChild(script);      
    }else{
      doLogout(dispatch);
    }    
  };
}

export function logoutGoogle(){
  return (dispatch, getState) => {
    if (!window.gapi){
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/platform.js";
      script.async = true;
      script.onload = () => doLogout(dispatch);
      document.body.appendChild(script);      
    }else{
      doLogout(dispatch);
    }    
  };
}

function doLogout(dispatch)
{
  window.gapi.load('auth2', function() {
    window.gapi.auth2.init({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      fetch_basic_profile: true,
      scope: 'profile'
    }).then(function(auth){
      if (auth.isSignedIn.get() === true) {
        auth.signOut()
          .then(function(){
            dispatch(logout());
          });
      }else{
        dispatch(logout());
      }
    });
  });  
}
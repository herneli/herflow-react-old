import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import 'moment/locale/es';
import request from 'request';
import _ from 'lodash';

export const JWT_ACCESS_TOKEN_KEY = 'jwtAccessToken';
export const JWT_REFRESH_TOKEN_KEY = 'jwtRefreshToken';
export const LANGUAGE = 'language';

export function useLogin(WrappedComponent){
  return class ComponentLogin extends Component {
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.receiveToken = this.receiveToken.bind(this);
    }

    componentDidMount() {
        window.addEventListener("message", this.receiveToken, false);
    }
    componentWillUnmount() {
        window.removeEventListener("message", this.receiveToken, false);
    }
      
    receiveToken(event)
    {
        let origin = process.env.REACT_APP_AUTH_URL.toLowerCase();
        if (event.origin.toLowerCase() === origin)
        {
            if (event.data.success === true)
            {
                this.props.onLoginSuccess && this.props.onLoginSuccess(event.data.tokens);
            }else{
                this.props.onLoginFailure && this.props.onLoginFailure(event.data);
            }   
        }
    }

    handleLogin(){
        var width = 400;
        var height = 500;
        var left = (window.screen.width/2)-(width/2);
        var top = (window.screen.height/2)-(height/2);
        window.open(process.env.REACT_APP_AUTH_URL + "/auth/popup?applicationId="+process.env.REACT_APP_APPLICATION_ID,"Login",`width=${width}, height=${height}, top=${top}, left=${left}`);
    }

    render() {
        const { onLoginSuccess, onLoginFailure, ...passThroughProps } = this.props;
        return (
            <WrappedComponent {...passThroughProps} onClick={this.handleLogin} />
        );
    }
  }
}

export function isTokenExpired(){
    const token = getAccessToken();
    const tokenDecoded = jwtDecode(token);
    const now = moment.utc();
    const tokenExp = moment.unix(tokenDecoded.exp).utc();
    return (tokenExp < now);
}

export function getSessionDefaults(){
    const validLanguages = process.env.REACT_APP_LANGUAGES.split(",");
    let language;
    if (localStorage.getItem(LANGUAGE)){
        language = localStorage.getItem(LANGUAGE);
        if (validLanguages.indexOf(language) < 0){
            language = validLanguages[0];
          setLanguage(language);
        }
    }else if (navigator.language){
        if (validLanguages.indexOf(navigator.language) < 0){
            language = navigator.language;
            setLanguage(language);
        }else{
            language = validLanguages[0];
            setLanguage(language);
        }
    }    
    return {
      language,
      sidebarActive: false,
      isAuthenticated: false,
      expired: false,
      message: null
    };
}

export function setLanguage(language){
    moment.locale(language);

    localStorage.setItem(LANGUAGE, language);
}

export function getLanguage(){
  return localStorage.getItem(LANGUAGE);
}

export function getSessionInfo(){
  const token = getAccessToken();
  const sessionDefaults = getSessionDefaults();
    // If no Token is detected
    if (!token){
      return sessionDefaults;
    }

    const tokenDecoded = jwtDecode(token);
    const now = moment.utc();
    const tokenExp = moment.unix(tokenDecoded.exp).utc();

    if (tokenExp < now)
    {
      sessionStorage.removeItem(JWT_ACCESS_TOKEN_KEY);
      return sessionDefaults;
    }else{
      return _.assign({},sessionDefaults,{isAuthenticated: true, user: tokenDecoded});
    }
}

export function refreshToken(callback){
  return request(process.env.REACT_APP_AUTH_URL + '/oauth2/token',
  {
    method: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: "grant_type=refresh_token&client_Id=" +process.env.REACT_APP_APPLICATION_ID + "&refresh_token=" + getRefreshToken()
  },callback);
}

export function addApiHeaders(config)
  {
      if (!config){
          config = {};
      }
      const token = getAccessToken();
      if (token !== null){
          if (!config.headers){
              config.headers = {};
          }
          config.headers['Authorization'] = "Bearer " + token;
          config.headers['Accept-Language']= getLanguage();
      }
      return config;
  }

export function getAccessToken(){
  return localStorage.getItem(JWT_ACCESS_TOKEN_KEY) || null;
}

export function getRefreshToken(){
  return localStorage.getItem(JWT_REFRESH_TOKEN_KEY) || null;
}

export function setTokens(tokens){
  if (tokens == null){
    localStorage.removeItem(JWT_ACCESS_TOKEN_KEY);
    localStorage.removeItem(JWT_REFRESH_TOKEN_KEY);
  }else{
    localStorage.setItem(JWT_ACCESS_TOKEN_KEY,tokens.accessToken);
    localStorage.setItem(JWT_REFRESH_TOKEN_KEY,tokens.refreshToken);
  }
}


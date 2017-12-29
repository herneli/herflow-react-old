import request from 'request';
import { setSession } from './session/actions';
import { addApiHeaders, isTokenExpired, refreshToken } from './session/SessionHelper';

class HttpClient {
  callRedux(dispatch, config,callback) {
    // Token is expired?
    if (isTokenExpired()) {
      // Token is exipred -> Call refresh token
      refreshToken(function (error,response,body) {
        if (error){
          // If refresh token failder
          dispatch(setSession(null));
          //return Promise.reject(error);
          this.manageErrors(error);
        }else{
          // If refresh token was successful set new token to the session
          dispatch(setSession({ accessToken: body.access_token, refreshToken: body.refresh_token }));
          return this.call(config,callback);
        }
      }.bind(this));
    } else {
      // Call API
      return this.call(config,callback);
    }
  }

  call(config,callback) {
      // Add Headers for API call      
      const authConfig = addApiHeaders(config);
      // Call API
      return request(authConfig,function(error,response,body){
        if (error){
          this.manageErrors(error,response,body);
        }else{
          callback(error,response,body);
        }
      });
  }

  manageErrors(error,response,body) {
    if (response.response && body.isHandledError) {
      console.log(error);
    } else {
      console.log(error);
    }
  }
}

export default new HttpClient();
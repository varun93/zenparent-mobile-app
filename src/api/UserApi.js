import fetch from 'isomorphic-fetch'
import {prepareFormData} from '../utils'
import {SIGNUP_ENDPOINT,LOGIN_ENDPOINT,TOKEN_SIGNIN_ENDPOINT,
  EMAIL_SIGNIN_ENDPOINT,UPDATE_USER_PROFILE_ENDPOINT,
  UPDATE_USER_INTERESTS_ENDPOINT,APP_INIT_ENDPOINT,FORGOT_PASSWORD_ENDPOINT} from '../constants'

class UserApi {
  
  static requestHeaders() {
    return {'AUTHORIZATION': `Bearer ${localStorage.jwt}`}
  }

  static appInit(app_version){

    const headers = this.requestHeaders();

    const request = new Request(APP_INIT_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: prepareFormData({app_version})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });

  }

  //tested
  static requestUserStatus(userEmail){

    const request = new Request(EMAIL_SIGNIN_ENDPOINT, {
      method: 'POST',
      body: prepareFormData({user_email : userEmail})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  //tested
  static login(userEmail,userPassword) {

    const request = new Request(LOGIN_ENDPOINT, {
      method: 'POST',
      body: prepareFormData({user_email : userEmail, user_password : userPassword})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  } 

  //
  static signup(userEmail,userPassword,date) {
  
    const request = new Request(SIGNUP_ENDPOINT, {
      method: 'POST',
      body: prepareFormData({user_email : userEmail, user_password : userPassword,date : date})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });

  }

  //cannot be tested now
  static tokenSignin(token,socialUniqueId,userEmail,loginBy) {

    const headers = this.requestHeaders();
    const request = new Request(TOKEN_SIGNIN_ENDPOINT, {
      method: 'POST',
      headers: headers, 
      body: prepareFormData({social_unique_id : socialUniqueId,token : token,user_email : userEmail,login_by : loginBy})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });

  }

  //tested
  static updateUserInterests(interests) {

    const headers = this.requestHeaders();
    const request = new Request(UPDATE_USER_INTERESTS_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: prepareFormData({interests : interests})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });

  }

  static forgotPassword(userEmail){

    const request = new Request(FORGOT_PASSWORD_ENDPOINT, {
      method: 'POST',
      body: prepareFormData({user_email : userEmail})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });


  }

  // tested
  static updateUserProfile(date,stageOfParenting,displayName) {

    const headers = this.requestHeaders();

    const request = new Request(UPDATE_USER_PROFILE_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: prepareFormData({date : date,stage_of_parenting : stageOfParenting, display_name : displayName})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });

  }

}

export default UserApi;
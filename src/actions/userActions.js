import UserApi from '../api/UserApi';
import {removeCache} from '../utils/cachedFetch';
import {UserAnalytics} from '../utils/Analytics';
import {PROFILE_UPDATE,UPDATE_USER_INTERESTS,
USER_SIGNUP,USER_LOGIN,USER_PROFILE_SYNC,USER_PROFILE_UPDATED,USER_INTERESTS_UPDATED,USER_LOGOUT} from '../constants';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

// login actions
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

// signup signup actions
export const SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

// token signin actions
export const TOKEN_SIGNIN_USER_REQUEST = 'TOKEN_SIGNIN_USER_REQUEST';
export const TOKEN_SIGNIN_USER_SUCCESS = 'TOKEN_SIGNIN_USER_SUCCESS';
export const TOKEN_SIGNIN_USER_FAILURE = 'TOKEN_SIGNIN_USER_FAILURE';

//user status check
export const USER_STATUS_REQUEST = 'CHECK_USER_STATUS_REQUEST';
export const USER_STATUS_RECIEVED = 'USER_STATUS_RECIEVED';
export const ERROR_FETCHING_USER_STATUS = 'ERROR_FETCHING_USER_STATUS';


export const APP_INIT_REQUEST = 'APP_INIT_REQUEST';
export const APP_INIT_REQUEST_SUCCESS = 'APP_INIT_REQUEST_SUCCESS';
export const APP_INIT_REQUEST_FAILURE = 'APP_INIT_REQUEST_FAILURE';

// user profile update actions
export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAILURE = 'UPDATE_USER_INFO_FAILURE';

// update user interests 
export const UPDATE_USER_INTERESTS_REQUEST = 'UPDATE_USER_INTERESTS_REQUEST';
export const UPDATE_USER_INTERESTS_SUCCESS = 'UPDATE_USER_INTERESTS_SUCCESS';
export const UPDATE_USER_INTERESTS_FAILURE = 'UPDATE_USER_INTERESTS_FAILURE';

// user logout actions
export const LOGOUT_USER = 'LOGOUT_USER';


//------------------------ login related actions -------------------------
export function loginUserSuccess(user,token) {
  
  window.localStorage.setItem('jwt', token);
  
  try {
     UserAnalytics(USER_LOGIN,user); // generates an exception
  }
  catch (e) {
    // statements to handle any exceptions
    console.log(e); // pass exception object to error handler
  }


  return {
    type: LOGIN_USER_SUCCESS,
    user,
    token
  }

};

export function loginUserFailure(message) {
  
  window.localStorage.removeItem('jwt');
  
  return {
    type: LOGIN_USER_FAILURE,
    message
  }
};

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
};

//------------------------ signup related actions -------------------------

export function signupUserSuccess(user,token) {
  window.localStorage.setItem('jwt', token);//this is impotn
    
  try {
     UserAnalytics(USER_SIGNUP,user); // generates an exception
  }
  catch (e) {
    // statements to handle any exceptions
    console.log(e); // pass exception object to error handler
  }

  return {
    type: SIGNUP_USER_SUCCESS,
    user,
    token
  }
};

export function signupUserFailure(message) {
  window.localStorage.removeItem('jwt');
  return {
    type: SIGNUP_USER_FAILURE,
    message
  }
};

export function signupUserRequest() {
  return {
    type: SIGNUP_USER_REQUEST
  }
};


//------------------------ token signin related actions -------------------------

export function tokenSigninUserSuccess(user,token) {
  window.localStorage.setItem('jwt', token);//this is impotn
  return {
    type: TOKEN_SIGNIN_USER_SUCCESS,
    user,
    token
  }
};

export function tokenSigninUserFailure(error) {
  window.localStorage.removeItem('jwt');
  return {
    type: TOKEN_SIGNIN_USER_FAILURE,
    message
  }
};

export function tokenSigninUserRequest() {
  return {
    type: TOKEN_SIGNIN_USER_REQUEST
  }
};


//--------------- User Interests Actions -----------------------------
export function updateUserInterestsSuccess(interests){
 

   try{
      UserAnalytics(USER_INTERESTS_UPDATED);  
    }
    catch(e){
      console.log(e);
    }

  return {
    type : UPDATE_USER_INTERESTS_SUCCESS,
    interests
  }
};

export function updateUserInterestsRequest(){
  
  removeCache(UPDATE_USER_INTERESTS);

  return {
    type : UPDATE_USER_INTERESTS_REQUEST
  }
};

export function updateUserInterestsFailure(){
  return {
    type : UPDATE_USER_INTERESTS_FAILURE
  }
};


//--------------- User Info Update Actions -----------------------------
export function updateUserProfileSuccess(user){
  
  try {
     UserAnalytics(USER_PROFILE_UPDATED,user); // generates an exception
  }
  catch (e) {
    // statements to handle any exceptions
    console.log(e); // pass exception object to error handler
  }

  return {
    type : UPDATE_USER_INFO_SUCCESS,
    user
  }
};

export function updateUserProfileRequest(){
  
  removeCache(PROFILE_UPDATE);
  
  return {
    type : UPDATE_USER_INFO_REQUEST
  }
};

export function updateUserProfileFailure(){
  return {
    type : UPDATE_USER_INFO_FAILURE
  }
};

//---------------------------
export function requestUserStatus(){
  return {
    type : USER_STATUS_REQUEST
  }
};

export function receivedUserStatus(userStatus,userEmail){

  return {
    type : USER_STATUS_RECIEVED,
    userStatus,
    userEmail
  };

};


export function errorFetchingUserStatus(){
  return {
    type : ERROR_FETCHING_USER_STATUS
  };
};

// --------------- app init request ------------

export function appInitRequest(){
  return {
    type : APP_INIT_REQUEST
  };
};

export function appInitRequestSuccess(forceUpdate,appVersionNumber,user){
  let authenticated = false;

  if('id' in user && user.id) authenticated = true;

  try {
      UserAnalytics(USER_PROFILE_SYNC,user); // generates an exception
    }
    catch (e) {
      console.log(e); // pass exception object to error handler
    }

  return {
    type : APP_INIT_REQUEST_SUCCESS,
    forceUpdate,
    user,
    authenticated,
    appVersionNumber
  };

};

export function appInitRequestFailure(){

  return {
    type : APP_INIT_REQUEST_FAILURE
  };

};

//------------- forgot password ---------------
export function forgotPasswordRequest(){
  return {
    type : FORGOT_PASSWORD_REQUEST
  };
};

export function forgotPasswordSucess(status,message){
  return {
    type : FORGOT_PASSWORD_SUCCESS,
    status,
    message
  };
};


export function forgotPasswordFailure(){
  return {
    type : FORGOT_PASSWORD_FAILURE
  };
};

// -------------- logout related actions --------------
export function logout() {
    delete window.localStorage.state;
    delete window.localStorage.jwt;

    try{
      UserAnalytics(USER_LOGOUT);  
    }
    catch(e){
      console.log(e);
    }
   
    // cache removed 
    removeCache(USER_LOGOUT);

    return {
        type: LOGOUT_USER
    }
};


//---------------------- Redux thunk --------------------------------------
export function appInit(appVersion){

  return (dispatch,state) => {
    dispatch(appInitRequest());

    UserApi.appInit(appVersion).then(function(response){

      let isTokenValid = response.data.isTokenValid;
      let user = response.data.user;
      let forceUpdate = response.data.forceUpdate;
      dispatch(appInitRequestSuccess(forceUpdate,isTokenValid,user));
    
    }).catch((err) => {
      dispatch(appInitRequestFailure())
    });
  
  };

};


export function forgotPassword(userEmail){

  return (dispatch,state) => {
    dispatch(forgotPasswordRequest());

    UserApi.forgotPassword(userEmail).then(function(response){

      let status = response.data.status;
      let message = response.data.message;
      dispatch(forgotPasswordSucess(status,message));
    
    }).catch((err) => {
      dispatch(forgotPasswordFailure())
    });
  
  };

};


export function checkUserStatus(userEmail){

  return (dispatch,state) => {
    dispatch(requestUserStatus());

    UserApi.requestUserStatus(userEmail).then(function(response){

      let userStatus = 'new-user';
      let isRegistered = response.data.is_registered;
      if(isRegistered){
        userStatus = 'registered';
      }
      dispatch(receivedUserStatus(userStatus,userEmail));
    }).catch((err) => {
      dispatch(errorFetchingUserStatus())
    });
  
  };

};


export function updateUserProfile(date,stageOfParenting,displayName){
    
      return (dispatch,state) => {
          
          dispatch(updateUserProfileRequest());

          UserApi.updateUserProfile(date,stageOfParenting,displayName).then(function(response){
              let user = response.data.user;
              dispatch(updateUserProfileSuccess(user));  
            
            }).catch((err) => {
                dispatch(updateUserProfileFailure()); 
              });
      }
};

export function updateUserInterests(interests) {
    
      return (dispatch,state) => {
          
          dispatch(updateUserInterestsRequest());

          UserApi.updateUserInterests(interests).then(function(response){
              
              let interests = response.data.interests;
              dispatch(updateUserInterestsSuccess(interests));  
            
            }).catch((err) => {
                dispatch(updateUserInterestsFailure()); 
              });
      }
};

export function tokenSignin(accessToken,socialUniqueId,userEmail,displayName,imageUrl,loginBy) {
    
      return (dispatch,state) => {
          
          dispatch(tokenSigninUserRequest());

          UserApi.tokenSignin(accessToken,socialUniqueId,userEmail,displayName,imageUrl,loginBy).then(function(response){
            
              let success = response.success;
              let user = response.data.user;
              let token = response.data.token;
            
              if(success){
                dispatch(tokenSigninUserSuccess(user,token));  
              }
              else{
                let message = response.data.message;
                dispatch(tokenSigninUserFailure(message)); 
              }
        
            }).catch((err) => {
                dispatch(tokenSigninUserFailure(err)); 
              });
      }
};

export function signup(userEmail, userPassword, date) {
    
      return (dispatch,state) => {
          
          dispatch(signupUserRequest());

          UserApi.signup(userEmail,userPassword,date).then(function(response){
            
              let success = response.success;
              let user = response.data.user;
              let token = response.data.token;
            
              if(success){
                dispatch(signupUserSuccess(user,token));  
              }
              else{
                let message = response.data.message;
                dispatch(signupUserFailure(message)); 
              }
        
            }).catch((err) => {
                dispatch(signupUserFailure(err)); 
              });
 
      }
};

export function login(userEmail, userPassword) {
    
      return (dispatch,state) => {
          
          dispatch(loginUserRequest());

          UserApi.login(userEmail,userPassword).then(function(response){
              
              let success = response.success;
              let user = response.data.user;
              let token = response.data.token;
              if(success){
                dispatch(loginUserSuccess(user,token));  
              }
              else{
                let message = response.data.message;
                dispatch(loginUserFailure(message)); 
              }

            }).catch((err) => {
                 dispatch(loginUserFailure(message));
              });
    }

};



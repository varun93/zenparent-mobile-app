import UserApi from '../api/UserApi';
import {removeCache} from '../utils/cachedFetch';

//action creator constants
import {FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAILURE,
LOGIN_USER_REQUEST,LOGIN_USER_SUCCESS,LOGIN_USER_FAILURE,
SIGNUP_USER_REQUEST,SIGNUP_USER_SUCCESS,SIGNUP_USER_FAILURE,
TOKEN_SIGNIN_USER_REQUEST,TOKEN_SIGNIN_USER_SUCCESS,TOKEN_SIGNIN_USER_FAILURE,
USER_STATUS_REQUEST,USER_STATUS_RECIEVED,ERROR_FETCHING_USER_STATUS,
APP_INIT_REQUEST,APP_INIT_REQUEST_SUCCESS,APP_INIT_REQUEST_FAILURE,
UPDATE_USER_INFO_REQUEST,UPDATE_USER_INFO_SUCCESS,UPDATE_USER_INFO_FAILURE,
UPLOAD_USER_PROFILE_PIC_REQUEST,UPLOAD_USER_PROFILE_PIC_SUCCESS,UPLOAD_USER_PROFILE_PIC_FAILURE,
LOGOUT_USER} from '../constants';



//------------------------ login related actions -------------------------
export function loginUserSuccess(user,token,navigator) {
  
  try{
    window.localStorage.setItem('jwt', token);  
  }
  catch(e){
    //handle the exception if any
  }
  

  return {
    type: LOGIN_USER_SUCCESS,
    user,
    token,
    navigator
  }

};

export function loginUserFailure(message) {
  
  try{
    window.localStorage.removeItem('jwt');
  }
  catch(e){
    // handle the exception if any
  }  

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

export function signupUserSuccess(user,token,navigator) {
  
  return {
    type: SIGNUP_USER_SUCCESS,
    user,
    token,
    navigator
  }
};

export function signupUserFailure(message) {
  
  try{
     window.localStorage.removeItem('jwt');//this is impotn
  }
  catch(e){
    //handle the exception
  }
 

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

export function tokenSigninUserSuccess(user,token,navigator) {

  try{
     window.localStorage.setItem('jwt', token);//this is impotn
  }
  catch(e){
    //handle the exception
  }
 
  return {
    type: TOKEN_SIGNIN_USER_SUCCESS,
    user,
    token,
    navigator
  }
};

export function tokenSigninUserFailure(error) {

  try{
    window.localStorage.removeItem('jwt');  
  }
  catch(e){
    // handle the exception 
  }
  

  return {
    type: TOKEN_SIGNIN_USER_FAILURE,
    error
  }
};

export function tokenSigninUserRequest() {
  return {
    type: TOKEN_SIGNIN_USER_REQUEST
  }
};



//--------------- User Info Update Actions -----------------------------
export function updateUserProfileSuccess(user,navigator){
  
  return {
    type : UPDATE_USER_INFO_SUCCESS,
    user,
    navigator
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


// --- update user profile pic
export function updateUserProfilePicRequest(){
  return {
    type : UPLOAD_USER_PROFILE_PIC_REQUEST
  }
};

export function updateUserProfilePicSuccess(imagePath){
  return {
    type : UPLOAD_USER_PROFILE_PIC_SUCCESS,
    imagePath 
  }
};

export function updateUserProfilePicFailure(){
  return {
    type : UPLOAD_USER_PROFILE_PIC_FAILURE
  }
};


//---------------------------
export function requestUserStatus(){
  return {
    type : USER_STATUS_REQUEST
  }
};

export function receivedUserStatus(userStatus,userEmail,navigator){

  return {
    type : USER_STATUS_RECIEVED,
    userStatus,
    userEmail,
    navigator
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
  
    // cache removed 
    removeCache(USER_LOGOUT);

    delete window.localStorage.state;
    delete window.localStorage.jwt;


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


export function checkUserStatus(userEmail,navigator){

  return (dispatch,state) => {
    dispatch(requestUserStatus());

    UserApi.requestUserStatus(userEmail).then(function(response){

      let userStatus = 'new-user';
      let isRegistered = response.data.is_registered;
      if(isRegistered){
        userStatus = 'registered';
      }
      dispatch(receivedUserStatus(userStatus,userEmail,navigator));
    }).catch((err) => {
      dispatch(errorFetchingUserStatus())
    });
  
  };

};


export function uploadUserProfilePic(imageUri){
      

      return (dispatch,state) => {
          
          dispatch(updateUserProfilePicRequest());

          UserApi.uploadUserProfilePic(imageUri).then(function(response){
              let status = response.data.status;
              let filePath = response.data.path;
              if(!!status){
                dispatch(updateUserProfilePicSuccess(filePath));  
              }
              else{
                dispatch(updateUserProfilePicFailure());  
              }
                
            }).catch((err) => {
              dispatch(updateUserProfilePicFailure());
        });
    }
};


export function updateUserProfile(date,stageOfParenting,displayName,languagePreference,navigator){
    
      return (dispatch,state) => {
          
          dispatch(updateUserProfileRequest());

          UserApi.updateUserProfile(date,stageOfParenting,displayName,languagePreference).then(function(response){
              let user = response.data.user;
              dispatch(updateUserProfileSuccess(user,navigator));  
            
            }).catch((err) => {
                dispatch(updateUserProfileFailure()); 
              });
      }
};

export function tokenSignin(accessToken,socialUniqueId,userEmail,displayName,imageUrl,loginBy,navigator) {
    
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

export function signup(userEmail, userPassword, date, languagePreference,navigator) {
    
      return (dispatch,state) => {
          
          dispatch(signupUserRequest());

          UserApi.signup(userEmail,userPassword,date,languagePreference).then(function(response){
            
              let success = response.success;
              let user = response.data.user;
              let token = response.data.token;
            
              if(success){
                dispatch(signupUserSuccess(user,token,navigator));  
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

export function login(userEmail, userPassword,navigator) {
    
      return (dispatch,state) => {
          
          dispatch(loginUserRequest());

          UserApi.login(userEmail,userPassword).then(function(response){
              
              let success = response.success;
              let user = response.data.user;
              let token = response.data.token;
              if(success){
                dispatch(loginUserSuccess(user,token,navigator));  
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



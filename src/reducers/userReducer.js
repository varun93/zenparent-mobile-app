//action creator constants
import {FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAILURE,
LOGIN_USER_REQUEST,LOGIN_USER_SUCCESS,LOGIN_USER_FAILURE,
SIGNUP_USER_REQUEST,SIGNUP_USER_SUCCESS,SIGNUP_USER_FAILURE,
TOKEN_SIGNIN_USER_REQUEST,TOKEN_SIGNIN_USER_SUCCESS,TOKEN_SIGNIN_USER_FAILURE,
USER_STATUS_REQUEST,USER_STATUS_RECIEVED,ERROR_FETCHING_USER_STATUS,
APP_INIT_REQUEST,APP_INIT_REQUEST_SUCCESS,APP_INIT_REQUEST_FAILURE,
UPDATE_USER_INFO_REQUEST,UPDATE_USER_INFO_SUCCESS,UPDATE_USER_INFO_FAILURE,
UPDATE_USER_INTERESTS_REQUEST,UPDATE_USER_INTERESTS_SUCCESS,UPDATE_USER_INTERESTS_FAILURE,
UPLOAD_USER_PROFILE_PIC_REQUEST,UPLOAD_USER_PROFILE_PIC_SUCCESS,UPLOAD_USER_PROFILE_PIC_FAILURE,
LOGOUT_USER} from '../constants';

import {loadState} from '../utils/localStorage';

const persistedState =  loadState() || {forgotPassword : {status : '',message : ''},forceUpdate : false,authenticated : false,userInfo : null,loading : false,error : false};
const INITIAL_STATE = persistedState;

const updateUserInfo = (user,state) => {
    user = user ? user : state.userInfo;
    return Object.assign({},state,{authenticated : true,userInfo : user,loading : false,error : false});
};

const updateUserInfoWithToken = (user,token,state) => {
    if (user){
        return Object.assign({},state,{authenticated : true,userInfo : user,loading : false,error : false,token: token});
    }
};

const updateUserInterests = (interests,state) => {
    let userInfo = Object.assign({},state.userInfo,{interests : interests});
    return Object.assign({},state,{ userInfo :  userInfo},{loading : false});
};

let userReducer = (user = INITIAL_STATE, action) => {
 
  switch (action.type) {
   
    case APP_INIT_REQUEST_SUCCESS : 
    return Object.assign({},user,{authenticated : true, userInfo : Object.assign({},user.userInfo,action.user)});
    case APP_INIT_REQUEST_FAILURE : 
    return Object.assign({},user,{authenticated : false});

    case USER_STATUS_REQUEST : 
    return Object.assign({},user,{authenticated : false,userInfo : null,error : false,loading : true});
    case USER_STATUS_RECIEVED :    
    return Object.assign({},user,{loading:false,error : false, status : action.userStatus,authenticated : false,userInfo : Object.assign({},user.userInfo,{user_email : action.userEmail})});
    case ERROR_FETCHING_USER_STATUS : 
    return Object.assign({},user,{status : null,authenticated : false,userInfo : null,loading : false,error : true});

    //signup related reducers
    case SIGNUP_USER_REQUEST :
    return Object.assign({},user,{authenticated : false,error : false,loading : true});
    case SIGNUP_USER_SUCCESS :
    return updateUserInfoWithToken(action.user,action.token,user);
    case SIGNUP_USER_FAILURE :
    return Object.assign({},user,{authenticated : false,error: action.message, loading: false});


    //login related reducers
    case LOGIN_USER_REQUEST :
    return Object.assign({},user,{authenticated : false,error : false,loading : true});
    case LOGIN_USER_SUCCESS:
    return updateUserInfoWithToken(action.user,action.token,user);
    case LOGIN_USER_FAILURE :
    return Object.assign({},user,{authenticated : false,error: action.message, loading: false});

    //forgot password reducers
    case FORGOT_PASSWORD_REQUEST :
    return Object.assign({},user,{authenticated : false,error : false,loading : true});
    case FORGOT_PASSWORD_SUCCESS : 
    return Object.assign({},user,{loading:false},{forgotPassword : Object.assign({},{status : action.status,message : action.message})});
    case FORGOT_PASSWORD_FAILURE : 
    return Object.assign({},user,{authenticated : false,error : true,loading : false});

    //token signin related reducers
    case TOKEN_SIGNIN_USER_REQUEST :
    return Object.assign({},user,{user : null,error : null,loading : true});
   
    case TOKEN_SIGNIN_USER_SUCCESS:
    return updateUserInfoWithToken(action.user,action.token,user);
   
    case TOKEN_SIGNIN_USER_FAILURE :
    return Object.assign({},user,{authenticated : false,userInfo: null, error: action.message, loading: false});

    //update user profile pic
    case UPLOAD_USER_PROFILE_PIC_REQUEST : 
    return Object.assign({},user,{loading : true});
    case UPLOAD_USER_PROFILE_PIC_SUCCESS : 
    return Object.assign({},user,{userInfo : Object.assign({},user.userInfo,{user_avatar : action.imagePath})},{loading : false,status : 'profile-image-updated'});
    case UPLOAD_USER_PROFILE_PIC_FAILURE :
    return Object.assign({},user,{loading : false, error : true});

    //token signin related reducers
    case UPDATE_USER_INFO_REQUEST :
    return Object.assign({},user,{loading: true,error:null}); 
    case UPDATE_USER_INFO_SUCCESS:
    return updateUserInfo(action.user,user);
    case UPDATE_USER_INFO_FAILURE :
    return Object.assign({},user,{error:action.message, loading: false});

    //update user interests
    case UPDATE_USER_INTERESTS_REQUEST :
        return Object.assign({},user,{loading: true,error:null}); 
    case UPDATE_USER_INTERESTS_SUCCESS:
        return updateUserInterests(action.interests,user);
    case UPDATE_USER_INTERESTS_FAILURE :
        return Object.assign({},user,{error:action.message,loading: false});

    //logout user 
    case LOGOUT_USER:
        return {forceUpdate : false,authenticated : false,userInfo : null,loading : false,error : false};

    default: return user;
 
  }

};

export default userReducer;

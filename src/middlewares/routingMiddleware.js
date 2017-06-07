import {v4} from 'node-uuid';
import getNextRoute from '../utils/getNextRoute';
import MainScreen from '../screens/MainScreen';
import AuthScreen from '../screens/AuthScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

//action creator constants
import {FORGOT_PASSWORD_SUCCESS,LOGIN_USER_SUCCESS,SIGNUP_USER_SUCCESS,TOKEN_SIGNIN_USER_SUCCESS,UPDATE_USER_INTERESTS_SUCCESS,
USER_STATUS_RECIEVED,APP_INIT_REQUEST_SUCCESS,UPDATE_USER_INFO_SUCCESS,LOGOUT_USER,
REQUEST_SINGLE_POST} from '../constants';

const routingMiddleware = store => next => action => {

  if(action.hasOwnProperty('type')){

  	let component = null,props={};

   	switch(action.type){

      // user actions related navigation
      case SIGNUP_USER_SUCCESS  :
      case UPDATE_USER_INFO_SUCCESS:
      case LOGIN_USER_SUCCESS :
  			const user = action.user;
  			const route = getNextRoute(user);
  			component = route.component;
        break; 
    	case USER_STATUS_RECIEVED :
  			const userStatus = action.userStatus;
  			component = (userStatus == 'new-user') ? SignupScreen : LoginScreen;
        break;
  		case UPDATE_USER_INTERESTS_SUCCESS : 
  			component = MainScreen;
  			break;
  		case LOGOUT_USER:
  			component = AuthScreen;
	  		break;

  	}

  	const navigator = action.navigator;
    navigator && component && navigator.pushPage({component,props});
  
  }

  next(action);
};

export default routingMiddleware;
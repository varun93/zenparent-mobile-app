import getNextRoute from '../utils/getNextRoute';
import MainScreen from '../screens/MainScreen';
import AuthScreen from '../screens/AuthScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

//action creator constants
import {FORGOT_PASSWORD_SUCCESS,LOGIN_USER_SUCCESS,SIGNUP_USER_SUCCESS,TOKEN_SIGNIN_USER_SUCCESS,UPDATE_USER_INTERESTS_SUCCESS,
USER_STATUS_RECIEVED,APP_INIT_REQUEST_SUCCESS,UPDATE_USER_INFO_SUCCESS,LOGOUT_USER} from '../constants';

const routingMiddleware = store => next => action => {

  if(action.hasOwnProperty('type')){

  	let component = null;

 	switch(action.type){

  		case LOGIN_USER_SUCCESS :
  			const user = action.user;
  			console.log(action);
  			const route = getNextRoute(user);
  			console.log(route);
  			component = route.component;
  			break; 
  		case SIGNUP_USER_SUCCESS  :
	  		break;
  		case UPDATE_USER_INFO_SUCCESS:
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

  	if(navigator && component) {
 		navigator.pushPage({component})
 	};
  
  }

  next(action);
};

export default routingMiddleware;
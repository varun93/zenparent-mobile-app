import {UserAnalytics,BlogAnalytics,ChatroomAnalytics} from '../utils/Analytics';
//action creator constants
import {LOGIN_USER_SUCCESS,SIGNUP_USER_SUCCESS,TOKEN_SIGNIN_USER_SUCCESS,UPDATE_USER_INTERESTS_SUCCESS,
USER_STATUS_RECIEVED,UPDATE_USER_INFO_SUCCESS,LOGOUT_USER} from '../constants';
//blog action creator contants
import {RECEIVED_SINGLE_POST,POST_LIKE_SUCCESS,POST_BOOKMARK_SUCCESS} from '../constants';
//chat action creator constants
import {SEND_MESSAGE_SUCCESS,JOIN_CHATROOM,LEAVE_CHATROOM} from '../constants';
// user analytics contants
import {PROFILE_UPDATE,USER_SIGNUP,USER_LOGIN,USER_PROFILE_SYNC,USER_PROFILE_UPDATED,USER_INTERESTS_UPDATED,USER_LOGOUT} from '../constants';
// blog analytics constants
import {POST_LIKED,POST_BOOKMARKED,SCREEN_VIEWED,POST_SHARED} from '../constants';
// chat analytics constants
import {CHATROOM_VISITED,JOINED_CHATROOM,LEFT_CHATROOM,MESSAGE_SENT} from '../constants';


const analyticsMiddleware = store => next => action => {
  	
  	if(action.hasOwnProperty('type')){

  		switch(action.type){

  			// user related
  			case LOGIN_USER_SUCCESS:
  				UserAnalytics(USER_LOGIN,action.user); 
				break;

  			case SIGNUP_USER_SUCCESS:
  				UserAnalytics(USER_SIGNUP,action.user); 
				break;

  			case UPDATE_USER_INTERESTS_SUCCESS :
			    UserAnalytics(USER_INTERESTS_UPDATED);  
			    break;

  			case UPDATE_USER_INFO_SUCCESS : 
  				UserAnalytics(USER_PROFILE_UPDATED,action.user); 
				break;

  			case LOGOUT_USER :
  				UserAnalytics(USER_LOGOUT);  
				break;

			case TOKEN_SIGNIN_USER_SUCCESS:
	  			break;

	  		case RECEIVED_SINGLE_POST : 
				BlogAnalytics(SCREEN_VIEWED,action.postId,store.getState()); 
				break;

	  		case POST_LIKE_SUCCESS :
	  			BlogAnalytics(POST_LIKED,action.postId,store.getState()); 
				break;

	  		case POST_BOOKMARK_SUCCESS : 
	  			BlogAnalytics(POST_BOOKMARKED,action.postId,store.getState());
				break;

	  		case SEND_MESSAGE_SUCCESS : 
	  			ChatroomAnalytics(MESSAGE_SENT,action.chatroomId,store.getState()); 
				break;

	  		case JOIN_CHATROOM : 
	  			ChatroomAnalytics(JOINED_CHATROOM,action.chatroomId,store.getState()); 
				break;

	  		case LEAVE_CHATROOM :
				ChatroomAnalytics(LEFT_CHATROOM,action.chatroomId,store.getState()); 
				break;
  		}
  	}

  	next(action);
};

export default analyticsMiddleware;

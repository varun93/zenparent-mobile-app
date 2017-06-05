import {UserAnalytics,BlogAnalytics,ChatroomAnalytics} from '../utils/Analytics';
//action creator constants
import {LOGIN_USER_SUCCESS,SIGNUP_USER_SUCCESS,TOKEN_SIGNIN_USER_SUCCESS,UPDATE_USER_INTERESTS_SUCCESS,
USER_STATUS_RECIEVED,UPDATE_USER_INFO_SUCCESS,LOGOUT_USER} from '../constants';
//blog action creator contants
import {RECEIVED_SINGLE_POST,POST_LIKE_SUCCESS,POST_BOOKMARKED_SUCCESS} from '../constants';
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
  				try {
     				UserAnalytics(USER_LOGIN,user); // generates an exception
				}
				catch (e) {
				    // statements to handle any exceptions
				    console.log(e); // pass exception object to error handler
  				}	
				break;

  			case SIGNUP_USER_SUCCESS:
  				  try {
				     window.localStorage.setItem('jwt', token);//this is impotn
				     UserAnalytics(USER_SIGNUP,user); // generates an exception
				  }
				  catch (e) {
					// statements to handle any exceptions
				    console.log(e); // pass exception object to error handler
  				}	
				break;

  			case UPDATE_USER_INTERESTS_SUCCESS :
  				try{
			      UserAnalytics(USER_INTERESTS_UPDATED);  
			    }
			    catch(e){
			      console.log(e);
			    }
				break;

  			case UPDATE_USER_INFO_SUCCESS : 
  				try{
   		 				UserAnalytics(USER_PROFILE_UPDATED,user); // generates an exception
				}
				catch(e) {
					// statements to handle any exceptions
					console.log(e); // pass exception object to error handler
  				}
				break;

  			case LOGOUT_USER :
  				try{
      				UserAnalytics(USER_LOGOUT);  
			    }
			    catch(e){
				   console.log(e);
    			}	
   				break;

			case TOKEN_SIGNIN_USER_SUCCESS:
	  			break;

	  		case SCREEN_VIEWED : 

				// record screen viewed event
				try {
					BlogAnalytics(SCREEN_VIEWED,postId,state); // generates an exception
				}
				catch (e) {
					// statements to handle any exceptions
					console.log(e); // pass exception object to error handler
				}

				break;

	  		case POST_LIKED :
	  			// toggle treated as a +ve event, makes no difference to analytics as long it is measuring user engagement
				try {
				  	 BlogAnalytics(POST_LIKED,postId,state); // generates an exception
				}
				catch (e) {
				   	// statements to handle any exceptions
					console.log(e); // pass exception object to error handler
				}
	  			break;

	  		case POST_BOOKMARKED : 
	  			// toggle treated as a +ve event, makes no difference to analytics as long it is measuring user engagement
				try {
				  	BlogAnalytics(POST_BOOKMARKED,postId,state); // generates an exception
				}
				catch (e) {
					// statements to handle any exceptions
				   	console.log(e); // pass exception object to error handler
				}
	  			break;

	  		case MESSAGE_SENT : 
	  			//chatroom analytics
				try {
					ChatroomAnalytics(MESSAGE_SENT,chatroomId,state); // generates an exception
				}
				catch (e) {
				   	// statements to handle any exceptions
				console.log(e); // pass exception object to error handler
				}
				break;

	  		case JOINED_CHATROOM : 
	  			try {
				  	 ChatroomAnalytics(JOINED_CHATROOM,chatroomId,state); // generates an exception
				}
				catch (e) {
				   	// statements to handle any exceptions
					console.log(e); // pass exception object to error handler
				}
				
				break;

	  		case LEFT_CHATROOM :

	  			try {
				  	 ChatroomAnalytics(LEFT_CHATROOM,chatroomId,state); // generates an exception
					}
				catch (e) {
					// statements to handle any exceptions
				   	console.log(e); // pass exception object to error handler
				}

	  			break;
  		}
  	}
};


// try {
  //     UserAnalytics(USER_PROFILE_SYNC,user); // generates an exception
  //   }
  //   catch (e) {
  //     console.log(e); // pass exception object to error handler
  //   }


export default analyticsMiddleware;
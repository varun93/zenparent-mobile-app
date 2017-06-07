const environment = process.env.NODE_ENV;

import {POST_LIKED,POST_BOOKMARKED,SCREEN_VIEWED,POST_SHARED,LANGUAGE_TOGGLED,
	CHATROOM_VISITED,JOINED_CHATROOM,LEFT_CHATROOM,MESSAGE_SENT,
	USER_SIGNUP,USER_LOGIN,USER_PROFILE_SYNC,USER_PROFILE_UPDATED,USER_INTERESTS_UPDATED,USER_LOGOUT} from '../constants';


	

const recordClevertapEvent = (eventName,eventData) => {
	

	try{
		CleverTap.recordEventWithNameAndProps(eventName, eventData);
	}
	catch(e){
		console.log(eventName,eventData); 
	}

	
};


export const BlogAnalytics = (event,postId,state) => {

		//substring to limit the number of characters
		const title = (typeof state == 'object') ? state.blog.posts.byId[postId].title.substr(0,100) : state;
		let eventName = '',eventData = {};

		switch(event){
			case POST_LIKED : 
				eventName = 'Post Liked';
				eventData = {"post":title};
				break;
			case POST_BOOKMARKED : 
				eventName = 'Post Bookmarked';
				eventData = {"post":title};
				break;
			case SCREEN_VIEWED : 
				//ga tracking
				try{
					window.ga.trackView(title);	
				}
				catch(e){

				}
				eventName = 'Screen Viewed';
				eventData = {"post":title};
				break;
			case POST_SHARED : 
				eventName = 'Post Shared';
				eventData = {"post":title};
				break;
		}

		recordClevertapEvent(eventName,eventData);
};

// slightly inconsitent API, state can be obj or title
export const ChatroomAnalytics = (event,chatroomId,state) => {


		//substring to limit the number of characters
		const title = (typeof state == 'object') ?  state.chat.chatRooms.byId[chatroomId].post_title : state;
		let eventName = '',eventData={};

		switch(event){
			case CHATROOM_VISITED : 
				eventName = 'Chatroom Visited';
				eventData = {"chatroom":title};
				break;
			case JOINED_CHATROOM : 
				eventName = 'Group Joined';
				eventData = {"chatroom":title};
				break;
			case LEFT_CHATROOM : 
				eventName = 'Group Left';
				eventData = {"chatroom":title};
				break;
			case MESSAGE_SENT : 
				eventName = 'Message Sent';
				eventData = {"chatroom":title};
				break;
		}

	recordClevertapEvent(eventName,eventData);		

};

// fire, event and change data
export const UserAnalytics = (event,user) => {
	
		let eventName='',eventData={};

		if(user){
			const cleverTapUserObj =  {
				Identity : user.id,
				Email : user.user_email,
				StageOfParenting : user.stage_of_parenting,
				DueDate : user.due_date,
				DateOfBirth : user.dob, 
				LanguagePreference : user.language_preference,
				SignupCompletionLevel : 'done',
				user_activated : user.is_user_activated,
				interests : user.interests.join(' | '),
				'MSG-email' : true,
				'MSG-push' :  true
			};	
			// set profile info
			try{
				CleverTap.profileSet(cleverTapUserObj);	
			}
			catch(e){

			}
			
		}


       	switch(event){

       		case LANGUAGE_TOGGLED : 
       			eventName = 'Language Toggled';
       			break;
			case USER_SIGNUP : 
				eventName = 'Signup Completed';
				break;
			case USER_LOGIN : 
				console.log("User Login");
				eventName = 'Login';
				// CleverTap.onUserLogin({"Identity" : user.id});
				break;
			case USER_PROFILE_SYNC: 
				eventName = 'User Profile Sync';
				break;
			case USER_PROFILE_UPDATED : 
				eventName = 'Profile Updated';
				break;
			case USER_INTERESTS_UPDATED:
				eventName = 'Interests Updated';
				break;
			case USER_LOGOUT :
				eventName = 'Logout';
				break;
		}
		
		recordClevertapEvent(eventName,eventData);

};


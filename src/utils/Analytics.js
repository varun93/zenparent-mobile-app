const environment = process.env.NODE_ENV;

import {POST_LIKED,POST_BOOKMARKED,SCREEN_VIEWED,POST_SHARED,
	CHATROOM_VISITED,JOINED_CHATROOM,LEFT_CHATROOM,MESSAGE_SENT,
	USER_SIGNUP,USER_LOGIN,USER_PROFILE_SYNC,USER_PROFILE_UPDATED,USER_INTERESTS_UPDATED,USER_LOGOUT} from '../constants';


export const BlogAnalytics = (event,postId,state) => {

	
	if(environment == 'production'){

		//substring to limit the number of characters
		const title = state.blog.posts[postId].title.substr(0,100);
	
		switch(event){
			case TOGGLE_POST_LIKED : 
				CleverTap.recordEventWithNameAndProps("Post Liked", {"post":title});
				break;
			case TOGGLE_POST_BOOKMARKED : 
				CleverTap.recordEventWithNameAndProps("Post Bookmarked", {"post":title});
				break;
			case SCREEN_VIEWED : 
				//ga tracking
				window.ga.trackView(title);
				// clevertap tracking
				CleverTap.recordEventWithNameAndProps("Screen Viewed", {"post":title});
				break;
			case POST_SHARED : 
				CleverTap.recordEventWithNameAndProps("Post Shared", {"post":title});
				break;
		}
	}

};


export const ChatroomAnalytics = (event,chatroomId,state) => {

	
	if(environment == 'production'){

		//substring to limit the number of characters
		const title = state.chat.chatRooms[chatroomId].post_title;
	
		switch(event){
			case CHATROOM_VISITED : 
				CleverTap.recordEventWithNameAndProps("Chatroom Visited", {"chatroom":title});
				break;
			case JOINED_CHATROOM : 
				CleverTap.recordEventWithNameAndProps("Group Joined", {"chatroom":title});
				break;
			case LEFT_CHATROOM : 
				CleverTap.recordEventWithNameAndProps("Group Left", {"chatroom":title});
				break;
			case MESSAGE_SENT : 
				CleverTap.recordEventWithNameAndProps("Message Sent", {"chatroom":title});
				break;
		}
	
	}

};

// fire, event and change data
export const UserAnalytics = (event,user) => {

	
	if(environment == 'production'){


		if(user){
			const cleverTapUserObj =  {
				Identity : user.id,
				StageOfParenting : user.stage_of_parenting,
				DueDate : user.due_date,
				DateOfBirth : user.date_of_birth, 
				LanguagePreference : user.language_preference,
				SignupCompletionLevel : 'done'
				user_activated : user.user_activated,
				interests : user.interests.join(' | ') 
			};	
			// set profile info
			CleverTap.profileSet(cleverTapUserObj);
		}
		
       
		switch(event){
			case USER_SIGNUP : 
			 	CleverTap.recordEventWithName("Signup Completed");
				break;
			case USER_LOGIN : 
				CleverTap.recordEventWithName("Login");
				break;
			case USER_PROFILE_SYNC: 
				break;
			case USER_PROFILE_UPDATED : 
				CleverTap.recordEventWithName("Profile Updated");
				break;
			case USER_INTERESTS_UPDATED:
				CleverTap.recordEventWithName("Interests Updated")
				break;
			case USER_LOGOUT :
				CleverTap.recordEventWithName("Logout")
				break;
		}
	
	}

};


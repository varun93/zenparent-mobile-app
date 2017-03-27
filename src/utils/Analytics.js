const environment = process.env.NODE_ENV;

import {POST_LIKED,POST_BOOKMARKED,SCREEN_VIEWED,POST_SHARED,
	CHATROOM_VISITED,JOINED_CHATROOM,LEFT_CHATROOM,MESSAGE_SENT,
	USER_SIGNUP,USER_LOGIN,USER_PROFILE_SYNC,USER_PROFILE_UPDATED,USER_INTERESTS_UPDATED,USER_LOGOUT} from '../constants';


export const BlogAnalytics = (event,postId,state) => {

	
	if(environment == 'production'){

		//substring to limit the number of characters
		const title = state.blog.posts.byId[postId].title.substr(0,100);
	
		switch(event){
			case POST_LIKED : 
				// console.log("Post Liked - Title : " + title);
				CleverTap.recordEventWithNameAndProps("Post Liked", {"post":title});
				break;
			case POST_BOOKMARKED : 
				// console.log("Post Bookmarked - Title : " + title);
				CleverTap.recordEventWithNameAndProps("Post Bookmarked", {"post":title});
				break;
			case SCREEN_VIEWED : 
				// console.log("Screen Viewed - Title : " + title);
				//ga tracking
				window.ga.trackView(title);
				// clevertap tracking
				CleverTap.recordEventWithNameAndProps("Screen Viewed", {"post":title});
				break;
			case POST_SHARED : 
				 // console.log("Post Shared - Title : " + title);
				CleverTap.recordEventWithNameAndProps("Post Shared", {"post":title});
				break;
		}
	}

};

// slightly inconsitent API, state can be obj or title
export const ChatroomAnalytics = (event,chatroomId,state) => {

	
	if(environment == 'production'){

		//substring to limit the number of characters
		const title = (typeof state == 'object') ?  state.chat.chatRooms.byId[chatroomId].post_title : state;
	
		switch(event){
			case CHATROOM_VISITED : 
				// console.log("Chatroom Visited " + title)
				CleverTap.recordEventWithNameAndProps("Chatroom Visited", {"chatroom":title});
				break;
			case JOINED_CHATROOM : 
				// console.log("Joined Chatroom " + title);
				CleverTap.recordEventWithNameAndProps("Group Joined", {"chatroom":title});
				break;
			case LEFT_CHATROOM : 
				// console.log("Left Chatroom " + title);
				CleverTap.recordEventWithNameAndProps("Group Left", {"chatroom":title});
				break;
			case MESSAGE_SENT : 
				// console.log("Message Sent " + title);
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
			// console.log(cleverTapUserObj);
			CleverTap.profileSet(cleverTapUserObj);
		}
		

       	switch(event){
			case USER_SIGNUP : 
				// console.log("Signup Completed");
			 	CleverTap.recordEventWithName("Signup Completed");
				break;
			case USER_LOGIN : 
				// console.log("User Login");
				CleverTap.recordEventWithName("Login");
				break;
			case USER_PROFILE_SYNC: 
				CleverTap.recordEventWithName("User Profile Sync");
				break;
			case USER_PROFILE_UPDATED : 
				// console.log("User Profile Updated");
				CleverTap.recordEventWithName("Profile Updated");
				break;
			case USER_INTERESTS_UPDATED:
				// console.log("User Interests updated");
				CleverTap.recordEventWithName("Interests Updated")
				break;
			case USER_LOGOUT :
				// console.log("User Logout");
				CleverTap.recordEventWithName("Logout");
				break;
		}
	
	}

};


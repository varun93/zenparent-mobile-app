// api endpoints
let BASE_URL = 'http://test.zenparent.in/api';

const environment = process.env.NODE_ENV;

if(environment == 'production'){
	BASE_URL = 'https://zenparent.in/api';
}

export const assetsBase = () => {
if (environment == 'production'){
	return 'assets/';
}
else{
	return '/assets/';
 }

};

//general
export const APP_VERSION = BASE_URL + '/appVersion';

//fetch interests
export const FETCH_INTERESTS_ENDPOINT = BASE_URL + '/getInterests';

//chat related endpoints
export const SEND_CHAT_MESSAGE_ENDPOINT = BASE_URL + '/sendMessage';
export const LIST_CHAT_MESSAGES_ENDPOINT = BASE_URL + '/listMessages';
export const LIST_CHAT_GROUPS_ENDPOINT = BASE_URL + '/listChatGroups';
export const GET_GROUP_INFO_ENDPOINT = BASE_URL + '/groupInfo';
export const JOIN_GROUP_ENDPOINT = BASE_URL + '/joinGroup';
export const LEAVE_GROUP_ENDPOINT = BASE_URL + '/leaveGroup';
export const RECORD_CHATROOM_ACTIVITY = BASE_URL + '/recordChatroomActivity';
//End of chat APIs

// ================= user endpoints =======================
export const SIGNUP_ENDPOINT = BASE_URL + '/signup';
export const LOGIN_ENDPOINT = BASE_URL + '/login';
export const TOKEN_SIGNIN_ENDPOINT = BASE_URL + '/tokensignin';
export const EMAIL_SIGNIN_ENDPOINT = BASE_URL + '/emailSignin';
export const UPDATE_USER_PROFILE_ENDPOINT = BASE_URL +'/updateProfile';
export const UPDATE_USER_INTERESTS_ENDPOINT = BASE_URL + '/updateUserInterests';
export const APP_INIT_ENDPOINT = BASE_URL + '/appInit';
export const FORGOT_PASSWORD_ENDPOINT = BASE_URL + '/forgotPassword' 
// =================== end of user endpoints ================

// posts endpoint
export const SINGLE_POST_ENDPOINT =  BASE_URL + '/singlePost';
export const POSTS_ENDPOINT = BASE_URL + '/articles';
export const TERM_ARCHIVES_ENDPOINT = BASE_URL + '/archive';
export const POST_BOOKMARK_ENDPOINT = BASE_URL + '/bookmarkPost';
export const POST_LIKE_ENDPOINT = BASE_URL + '/likePost';
export const POST_UNBOOKMARK_ENDPOINT = BASE_URL + '/unbookmarkPost';
export const POST_UNLIKE_ENDPOINT = BASE_URL + '/unlikePost';
export const SLOT_POSTS_ENDPOINT = BASE_URL + '/slotPosts';
export const POPULAR_POSTS_ENDPOINT = BASE_URL + '/popularPosts';
export const EDITORIAL_POSTS_ENDPOINT = BASE_URL + '/editorialPosts';
export const BOOKMARKED_POSTS_ENDPOINT = BASE_URL + '/bookmarkedPosts';
export const AUTHOR_POSTS_ENDPOINT = BASE_URL + '/authorPosts';
export const RECORD_USER_READING_HISTORY = BASE_URL + '/recordUserReadingHistory'; 

 
//--- constants for a few actions ------
export const GROUP_JOIN_UNJOIN = 'GROUP_JOIN_UNJOIN';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const LIKED_BOOKMARKED = 'LIKED_BOOKMARKED';
export const UPDATE_USER_INTERESTS = 'UPDATE_USER_INTERESTS';


// --- few generic constants
export const RECOMMENDED_GROUPS = 'RECOMMENDED_GROUPS';
export const JOINED_GROUPS = 'JOINED_GROUPS';
export const EXPERT_CHAT = 'EXPERT_CHAT';

// --------------- app keys -------------------
let PUSHER_APP_KEY = 'c9349fca0eab96c42440';
if(environment == 'production'){
	PUSHER_APP_KEY = 'd2a1f36e08f60f5cbd98';	
}
export {PUSHER_APP_KEY};


// event action
export const POST_LIKED = 'POST_LIKED';
export const POST_BOOKMARKED = 'POST_BOOKMARKED';
export const SCREEN_VIEWED = 'SCREEN_VIEWED';
export const POST_SHARED = 'POST_SHARED';
export const CHATROOM_VISITED = 'CHATROOM_VISITED';
export const JOINED_CHATROOM = 'JOINED_CHATROOM';
export const LEFT_CHATROOM = 'LEFT_CHATROOM';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_PROFILE_SYNC = 'USER_PROFILE_SYNC';
export const USER_PROFILE_UPDATED = 'USER_PROFILE_UPDATED';
export const USER_INTERESTS_UPDATED = 'USER_PROFILE_UPDATED';
export const USER_LOGOUT = 'USER_LOGOUT';

// GA TRACKING CODE
export const GA_TRACKING_CODE = 'UA-56979549-3';


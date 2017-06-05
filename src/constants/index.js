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
export const UPLOAD_USER_PROFILE_PIC_ENDPOINT = BASE_URL +'/uploadProfilePic';
export const UPDATE_USER_INTERESTS_ENDPOINT = BASE_URL + '/updateUserInterests';
export const APP_INIT_ENDPOINT = BASE_URL + '/appInit';
export const FORGOT_PASSWORD_ENDPOINT = BASE_URL + '/forgotPassword' 
// =================== end of user endpoints ================

// ================= posts endpoint =========================
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

 
// ================= coupons endpoint ==============================
export const COUPON_PAYMENT_ENDPOINT = BASE_URL + '/couponPayment';


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
export const LANGUAGE_TOGGLED = 'LANGUAGE_TOGGLED';
export const CHATROOM_VISITED = 'CHATROOM_VISITED';
export const JOINED_CHATROOM = 'JOINED_CHATROOM';
export const LEFT_CHATROOM = 'LEFT_CHATROOM';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_PROFILE_SYNC = 'USER_PROFILE_SYNC';
export const USER_PROFILE_UPDATED = 'USER_PROFILE_UPDATED';
export const USER_INTERESTS_UPDATED = 'USER_INTERESTS_UPDATED';
export const CHATROOM_OPENED = 'CHATROOM_OPENED';
export const USER_LOGOUT = 'USER_LOGOUT';

// GA TRACKING CODE
export const GA_TRACKING_CODE = 'UA-56979549-5';

// =================== USER ACTION CREATORS CONSTANTS ====================

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

// login actions
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

// signup signup actions
export const SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

// token signin actions
export const TOKEN_SIGNIN_USER_REQUEST = 'TOKEN_SIGNIN_USER_REQUEST';
export const TOKEN_SIGNIN_USER_SUCCESS = 'TOKEN_SIGNIN_USER_SUCCESS';
export const TOKEN_SIGNIN_USER_FAILURE = 'TOKEN_SIGNIN_USER_FAILURE';

//user status check
export const USER_STATUS_REQUEST = 'CHECK_USER_STATUS_REQUEST';
export const USER_STATUS_RECIEVED = 'USER_STATUS_RECIEVED';
export const ERROR_FETCHING_USER_STATUS = 'ERROR_FETCHING_USER_STATUS';


export const APP_INIT_REQUEST = 'APP_INIT_REQUEST';
export const APP_INIT_REQUEST_SUCCESS = 'APP_INIT_REQUEST_SUCCESS';
export const APP_INIT_REQUEST_FAILURE = 'APP_INIT_REQUEST_FAILURE';


// user profile update actions
export const UPLOAD_USER_PROFILE_PIC_REQUEST = 'UPLOAD_USER_PROFILE_PIC_REQUEST';
export const UPLOAD_USER_PROFILE_PIC_SUCCESS = 'UPLOAD_USER_PROFILE_PIC_SUCCESS';
export const UPLOAD_USER_PROFILE_PIC_FAILURE = 'UPLOAD_USER_PROFILE_PIC_FAILURE';

//user profile update actions
export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAILURE = 'UPDATE_USER_INFO_FAILURE';

// user logout actions
export const LOGOUT_USER = 'LOGOUT_USER';


// ================== USER INTERESTS UPDATE ACTIONS  ==========

export const REQUEST_INTERESTS = 'REQUEST_INTERESTS';
export const RECEIVED_INTERESTS = 'RECEIVED_INTERESTS';
export const ERROR_FETCHING_INTERESTS = 'ERROR_FETCHING_INTERESTS';
export const TOGGLE_INTEREST = 'TOGGLE_INTEREST';


// update user interests 
export const UPDATE_USER_INTERESTS_REQUEST = 'UPDATE_USER_INTERESTS_REQUEST';
export const UPDATE_USER_INTERESTS_SUCCESS = 'UPDATE_USER_INTERESTS_SUCCESS';
export const UPDATE_USER_INTERESTS_FAILURE = 'UPDATE_USER_INTERESTS_FAILURE';

 

// =======================  CONSTANTS PERTAINING TO BLOG ACTIONS =========================


// fetch homepage posts
export const REQUEST_USER_FEED_RELEVANCE = 'REQUEST_USER_FEED_RELEVANCE';
export const RECEIVED_USER_FEED_RELEVANCE = 'RECEIVED_USER_FEED_RELEVANCE';
export const ERROR_FETCHING_USER_FEED_RELEVANCE =  'ERROR_FETCHING_USER_FEED_RELEVANCE';

// fetch homepage posts
export const REQUEST_USER_FEED_TIME = 'REQUEST_USER_FEED_TIME';
export const RECEIVED_USER_FEED_TIME = 'RECEIVED_USER_FEED_TIME';
export const ERROR_FETCHING_USER_FEED_TIME =  'ERROR_FETCHING_USER_FEED_TIME';

// fetch popular posts
export const REQUEST_POPULAR_POSTS = 'REQUEST_POPULAR_POSTS';
export const RECEIVED_POPULAR_POSTS = 'RECEIVED_POPULAR_POSTS';
export const ERROR_FETCHING_POPULAR_POSTS =  'ERROR_FETCHING_POPULAR_POSTS';


// fetch editorial posts
export const REQUEST_EDITORIAL_POSTS = 'REQUEST_EDITORIAL_POSTS';
export const RECEIVED_EDITORIAL_POSTS = 'RECEIVED_EDITORIAL_POSTS';
export const ERROR_FETCHING_EDITORIAL_POSTS =  'ERROR_FETCHING_EDITORIAL_POSTS';


//fetch single post
export const RECEIVED_SINGLE_POST = 'RECEIVED_SINGLE_POST';
export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST';
export const ERROR_FETCHING_SINGLE_POST = 'ERROR_FETCHING_SINGLE_POST';

//post like requests
export const TOGGLE_LIKE = 'TOGGLE_LIKE';
export const POST_LIKE_SUCCESS = 'POST_LIKE_SUCCESS';
export const POST_LIKE_FAILURE = 'POST_LIKE_FAILURE';


//post bookmark requests
export const TOGGLE_BOOKMARK = 'TOGGLE_BOOKMARK';
export const POST_BOOKMARK_SUCCESS = 'POST_BOOKMARK_SUCCESS';
export const POST_BOOKMARK_FAILURE = 'POST_BOOKMARK_FAILURE';

//archives
export const REQUEST_ARCHIVE_POSTS = 'REQUEST_ARCHIVE_POSTS';
export const RECEIVED_ARCHIVE_POSTS = 'RECEIVED_ARCHIVE_POSTS';
export const ERROR_FETCHING_ARCHIVE_POSTS =  'ERROR_FETCHING_ARCHIVE_POSTS';

//bookmarked posts
export const REQUEST_BOOKMARKED_POSTS = 'REQUEST_BOOKMARKED_POSTS';
export const RECEIVED_BOOKMARKED_POSTS = 'RECEIVED_BOOKMARKED_POSTS';
export const ERROR_FETCHING_BOOKMARKED_POSTS =  'ERROR_FETCHING_BOOKMARKED_POSTS';

// fetch homepage posts
export const REQUEST_HOMEPAGE_SLOT_POSTS = 'REQUEST_HOMEPAGE_SLOT_POSTS';
export const RECEIVED_HOMEPAGE_SLOT_POSTS = 'RECEIVED_HOMEPAGE_SLOT_POSTS';
export const ERROR_FETCHING_HOMEPAGE_SLOT_POSTS =  'ERROR_FETCHING_HOMEPAGE_SLOT_POSTS ';

//TODO : add both bookmarked and unbookmarked
export const UPDATE_BOOKMARKED_LIST = 'UPDATE_BOOKMARKED_LIST';
//sync the user feeds upon profile update
export const SYNC_FEED = 'SYNC_FEED';

export const BOOKMARKED_POSTS = 'bookmarkedPosts';
export const ARCHIVE_POSTS = 'archivePosts';
export const USER_FEED_RELEVANCE = 'userFeedRelevance';
export const USER_FEED_TIME = 'userFeedTime';
export const HOMEPAGE_SLOT_POSTS = 'homepageSlotPosts';
export const POPULAR_POSTS = 'popularPosts';
export const EDITORIAL_POSTS = 'editorialPosts';


//===================== CHAT ACTION CONSTANTS ========================
//send new message
export const NEW_MESSAGE = 'NEW_MESSAGE';
// messages actions
export const RECEIVED_CHATROOM_MESSAGES = 'RECEIVED_CHATROOM_MESSAGES';
export const REQUEST_CHATROOM_MESSAGES = 'REQUEST_CHATROOM_MESSAGES';
export const ERROR_FETCHING_CHATROOM_MESSAGES = 'ERROR_FETCHING_CHATROOM_MESSAGES';

// join and leave chatroom
export const JOIN_CHATROOM = 'JOIN_CHATROOM';
export const LEAVE_CHATROOM = 'LEAVE_CHATROOM';

//open chatroom
export const SET_ACTIVE_CHATROOM = 'SET_ACTIVE_CHATROOM';

//send message 
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

// request chatrooms
export const REQUEST_CHATROOMS = 'REQUEST_CHATROOMS';
export const RECEIVED_CHATROOMS = 'RECEIVED_CHATROOMS';
export const ERROR_FETCHING_CHATROOMS = 'ERROR_FETCHING_CHATROOMS';

//reset counter
export const RESET_UNREAD_MESSAGES = 'RESET_UNREAD_MESSAGES';
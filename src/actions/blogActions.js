import BlogApi from '../api/BlogApi';
import {BlogAnalytics} from '../utils/BlogAnalytics';
import {POST_LIKED,POST_BOOKMARKED,SCREEN_VIEWED,POST_SHARED} from '../constants';


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
export const TOGGLE_LIKE = 'POST_LIKE_REQUEST';
export const POST_LIKE_FAILURE = 'POST_LIKE_FAILURE';
export const POST_LIKE_SUCCESS = 'POST_LIKE_SUCCESS';

//post bookmark requests
export const TOGGLE_BOOKMARK = 'POST_BOOKMARK_SUCCESS';
export const POST_BOOKMARK_REQUEST = 'POST_BOOKMARK_REQUEST';
export const POST_BOOKMARK_FAILURE = 'POST_BOOKMARK_FAILURE';

//fetch interests
export const REQUEST_INTERESTS = 'REQUEST_INTERESTS';
export const RECEIVED_INTERESTS = 'RECEIVED_INTERESTS';
export const ERROR_FETCHING_INTERESTS = 'ERROR_FETCHING_INTERESTS';
export const TOGGLE_INTEREST = 'TOGGLE_INTEREST';

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

//
export const RECORD_USER_READING_HISTORY = 'RECORD_USER_READING_HISTORY'; 

//sync the user feeds upon profile update
export const SYNC_FEED = 'SYNC_FEED';

export const BOOKMARKED_POSTS = 'bookmarkedPosts';
export const ARCHIVE_POSTS = 'archivePosts';
export const USER_FEED_RELEVANCE = 'userFeedRelevance';
export const USER_FEED_TIME = 'userFeedTime';
export const HOMEPAGE_SLOT_POSTS = 'homepageSlotPosts';
export const POPULAR_POSTS = 'popularPosts';
export const EDITORIAL_POSTS = 'editorialPosts';

// ----------------------- FETCH POSTS RELATED ACTIONS ------------------------
export function requestPosts(key){
	
	let type = null;

	switch(key) {

		case USER_FEED_RELEVANCE : 
			type = REQUEST_USER_FEED_RELEVANCE;
			break; 
		case USER_FEED_TIME : 
			type = REQUEST_USER_FEED_TIME;
			break;
		case HOMEPAGE_SLOT_POSTS : 
			type = REQUEST_HOMEPAGE_SLOT_POSTS;
			break;
		case BOOKMARKED_POSTS : 
			type = REQUEST_BOOKMARKED_POSTS;
			break;
		case ARCHIVE_POSTS : 
			type = REQUEST_ARCHIVE_POSTS;
			break;
		case POPULAR_POSTS : 
			type = REQUEST_POPULAR_POSTS;
			break;
		case EDITORIAL_POSTS : 
			type = REQUEST_EDITORIAL_POSTS;
			break;
		default : return null;

	}

	return {
		type : type
	}
};


export function receivedPosts(key,posts){
	
	let type = null;

	switch(key) {

		case USER_FEED_RELEVANCE : 
			type = RECEIVED_USER_FEED_RELEVANCE;
			break; 
		case USER_FEED_TIME : 
			type = RECEIVED_USER_FEED_TIME;
			break;
		case HOMEPAGE_SLOT_POSTS : 
			type = RECEIVED_HOMEPAGE_SLOT_POSTS;
			break;
		case BOOKMARKED_POSTS : 
			type = RECEIVED_BOOKMARKED_POSTS
			break;
		case POPULAR_POSTS : 
			type = RECEIVED_POPULAR_POSTS;
			break;
		case EDITORIAL_POSTS : 
			type = RECEIVED_EDITORIAL_POSTS;
			break;
		default : return null;

	}

	return {
		type : type,
		posts
	}

};

export function errorReceivingPosts(key){
	
	let type = null;

	switch(key) {

		case USER_FEED_RELEVANCE : 
			type = ERROR_FETCHING_USER_FEED_RELEVANCE;
			break; 
		case USER_FEED_TIME : 
			type = ERROR_FETCHING_USER_FEED_TIME;
			break;
		case HOMEPAGE_SLOT_POSTS : 
			type = ERROR_FETCHING_HOMEPAGE_SLOT_POSTS;
			break;
		case ARCHIVE_POSTS:
			type = ERROR_FETCHING_ARCHIVE_POSTS;
			break;
		case BOOKMARKED_POSTS :
			type = ERROR_FETCHING_BOOKMARKED_POSTS;
			break;
		case POPULAR_POSTS : 
			type = ERROR_FETCHING_POPULAR_POSTS;
			break;
		case EDITORIAL_POSTS : 
		 	type = ERROR_FETCHING_EDITORIAL_POSTS;
		 	break;
		default : return null;

	}

	return {
		type : type
	}

};


export function requestArchivePosts(term){
	return {
		type : REQUEST_ARCHIVE_POSTS,
		term
	}
};	

export function receivedArchivePosts(posts,term){
	return {
		type : RECEIVED_ARCHIVE_POSTS,
		key : ARCHIVE_POSTS,
		posts,
		term
	}
};	

export function errorFetchingArchivePosts(term){
	return {
		type : ERROR_FETCHING_ARCHIVE_POSTS,
		term
	}
};	

// ----------------------- FETCH SINGLE POST RELATED ACTIONS ------------------------
export function requestSinglePost(postId){
	return {
		type : REQUEST_SINGLE_POST,
		postId
	};
};


export function receivedSinglePost(postId,postContent,relatedPosts,state){

	// record screen viewed event
	try {
  	 BlogAnalytics(SCREEN_VIEWED,postId,state); // generates an exception
	}
	catch (e) {
   	// statements to handle any exceptions
   	console.log(e); // pass exception object to error handler
	}
	

	return {
		type : RECEIVED_SINGLE_POST,
		postId,
		postContent,
		relatedPosts
	};
};

export function errorReceivingSinglePost(postId){

	return {
		type : ERROR_FETCHING_SINGLE_POST,
		postId
	};
};


//---------------------------- LIKE AND BOOKMARK POSTS -----------------------------------

//Like
export function toggleLike(postId,state){

	// toggle treated as a +ve event, makes no difference to analytics as long it is measuring user engagement
	try {
  	 BlogAnalytics(POST_LIKED,postId,state); // generates an exception
	}
	catch (e) {
   	// statements to handle any exceptions
   	console.log(e); // pass exception object to error handler
	}

	return {
		type : TOGGLE_LIKE,
		postId
	};

};

export function likePostSuccess(postId){
	return {
		type : POST_LIKE_SUCCESS,
		postId
	};
};

export function likePostFailure(postId){
	return {
		type : POST_LIKE_FAILURE,
		postId
	};
};


//Bookmark
export function toggleBookmark(postId,state){
	
	// toggle treated as a +ve event, makes no difference to analytics as long it is measuring user engagement
	try {
  	 BlogAnalytics(POST_BOOKMARKED,postId,state); // generates an exception
	}
	catch (e) {
   	// statements to handle any exceptions
   	console.log(e); // pass exception object to error handler
	}

	return {
		type : TOGGLE_BOOKMARK,
		postId
	};
};

export function bookmarkPostSuccess(postId){
	return {
		type : POST_BOOKMARK_SUCCESS,
		postId
	};
};

export function bookmarkPostFailure(postId){
	return {
		type : POST_BOOKMARK_FAILURE,
		postId
	};
};

export function updateBookmarkedList(postId,operation) {
	return {
		type : UPDATE_BOOKMARKED_LIST,
		postId,
		operation
	}	
};

//------------------------ Interests ---------------------

export function requestInterests(){
	return {
		type : REQUEST_INTERESTS
	};
};

export function fetchInterestsSuccess(interests){
	return {
		type : RECEIVED_INTERESTS,
		interests
	};
};

export function fetchInterestsFailure(){
	return {
		type : ERROR_FETCHING_INTERESTS
	};
};

export function toggleInterest(term){
	return {
		type : TOGGLE_INTEREST,
		term
	}
}

export function syncFeed(){
	return {
		type : SYNC_FEED
	};
};

// --------------------------- redux thunk -----------------------------------
export function fetchInterests(){

	return (dispatch,getState) => {

		// return if already requested
		const state = getState();
		if(state.blog.interests.loading){
			return;
		}

		dispatch(requestInterests());
		BlogApi.fetchInterests().then((response) => {
			let interests = response.data.interests;
			dispatch(fetchInterestsSuccess(interests));
		}).catch((error) => {
			dispatch(fetchInterestsFailure());
		});

	};
};

export function toggleLikeRequest(id){

	return (dispatch,getState) => {
		let state = getState();
		
		dispatch(toggleLike(id,state));
		
		let request = null;

		if(state.blog.posts.byId[id].liked){
			request =  BlogApi.postUnlike(id);
		}
		else{
			request = BlogApi.postLike(id);
		}

		request.then(function(response){
  				// console.log(response);
  		}).catch((err) => {
      		// dispatch(errorReceivingPost());
      	});
	}
};

export function toggleBookmarkRequest(id){

	return (dispatch,getState) => {
		let state = getState();

		dispatch(toggleBookmark(id,state));

		let request = null;
		let operation = '+';

		if(state.blog.posts.byId[id].bookmarked){
			operation = '-';
			request =  BlogApi.postUnbookmark(id);
		}
		else{
			request =  BlogApi.postBookmark(id);
		}

		dispatch(updateBookmarkedList(id,operation));

		request.then((response) => {
			// console.log(response);
		}).catch((err) =>{
			//handle the error appropriately
		});

	}
};


export function fetchSinglePost(id){

	return (dispatch,getState) => {
		dispatch(requestSinglePost(id));

		BlogApi.fetchSinglePost(id).then(function(response){
  				let postContent = response.data.postContent;
  				let relatedPosts = response.data.relatedPosts;
  				dispatch(receivedSinglePost(id,postContent,relatedPosts,getState()));
  	
  			}).catch((err) => {
      		dispatch(errorReceivingSinglePost(id));
      	});
	}
};

//posts for user feed
export function fetchPosts(key,filter,offset){
	
	return (dispatch,state) => {
		dispatch(requestPosts(key));
		BlogApi.fetchPosts(filter,offset).then(function(response){
  				let posts = response.data.posts;
  				dispatch(receivedPosts(key,posts));
     	}).catch((err) => {
     		dispatch(errorReceivingPosts(key));
      	});
	}
};

export function fetchArchivePosts(key,term,offset){

	return (dispatch,state) => {
		dispatch(requestArchivePosts(term));

		BlogApi.archivePosts(term,offset).then(function(response){
  				let posts = response.data.posts;
  				dispatch(receivedArchivePosts(posts,term));
     	}).catch((err) => {
      		dispatch(errorFetchingArchivePosts(term));
      	});
	}

}

//personalized posts
export function fetchSlotPosts(key){
	
	return (dispatch,state) => {
		dispatch(requestPosts(key));

		BlogApi.slotPosts().then(function(response){
  			let posts = response.data.posts;
  			dispatch(receivedPosts(key,posts));
     	}).catch((err) => {
      		dispatch(errorReceivingPosts(key));
      	});
	}
};

//boomarked posts
export function fetchBookmarkedPosts(key,offset){
	
	return (dispatch,state) => {
		dispatch(requestPosts(key));
		BlogApi.bookmarkedPosts(offset).then(function(response){
  				let posts = response.data.posts;
  				dispatch(receivedPosts(key,posts));
     	}).catch((err) => {
      		dispatch(errorReceivingPosts(key));
      	});
	}
};


//popular posts
export function fetchPopularPosts(key){
	return (dispatch,state) => {
		dispatch(requestPosts(key));
		BlogApi.popularPosts().then(function(response){
  				let posts = response.data.posts;
  				dispatch(receivedPosts(key,posts));
     	}).catch((err) => {
      		dispatch(errorReceivingPosts(key));
      	});
	}
};

//editorial posts
export function fetchEditorialPosts(key){
	
	return (dispatch,state) => {
		dispatch(requestPosts(key));
		BlogApi.editorialPosts().then(function(response){
  				let posts = response.data.posts;
  				dispatch(receivedPosts(key,posts));
     	}).catch((err) => {
      		dispatch(errorReceivingPosts(key));
      	});
	}
};

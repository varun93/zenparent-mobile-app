import BlogApi from '../api/BlogApi';
//constants
import {REQUEST_USER_FEED_TIME,RECEIVED_USER_FEED_TIME,ERROR_FETCHING_USER_FEED_TIME,
REQUEST_USER_FEED_RELEVANCE,RECEIVED_USER_FEED_RELEVANCE,ERROR_FETCHING_USER_FEED_RELEVANCE,
RECEIVED_SINGLE_POST,REQUEST_SINGLE_POST,ERROR_FETCHING_SINGLE_POST,
TOGGLE_LIKE,POST_LIKE_SUCCESS,POST_LIKE_FAILURE,
REQUEST_POPULAR_POSTS,RECEIVED_POPULAR_POSTS,ERROR_FETCHING_POPULAR_POSTS,
REQUEST_EDITORIAL_POSTS,RECEIVED_EDITORIAL_POSTS,ERROR_FETCHING_EDITORIAL_POSTS,
POST_BOOKMARK_SUCCESS,TOGGLE_BOOKMARK,POST_BOOKMARK_FAILURE,
REQUEST_BOOKMARKED_POSTS,RECEIVED_BOOKMARKED_POSTS,ERROR_FETCHING_BOOKMARKED_POSTS,
REQUEST_ARCHIVE_POSTS,RECEIVED_ARCHIVE_POSTS,ERROR_FETCHING_ARCHIVE_POSTS,
REQUEST_HOMEPAGE_SLOT_POSTS,RECEIVED_HOMEPAGE_SLOT_POSTS,ERROR_FETCHING_HOMEPAGE_SLOT_POSTS,
USER_FEED_RELEVANCE,USER_FEED_TIME,HOMEPAGE_SLOT_POSTS,BOOKMARKED_POSTS,
ARCHIVE_POSTS,POPULAR_POSTS,EDITORIAL_POSTS,UPDATE_BOOKMARKED_LIST,SYNC_FEED} from '../constants';


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
export function requestSinglePost(postId,navigator){
	return {
		type : REQUEST_SINGLE_POST,
		postId
	};
};


// pass a navigator here 
export function receivedSinglePost(postId,post,state){

	return {
		type : RECEIVED_SINGLE_POST,
		postId,
		post
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
export function toggleLike(postId){
	
	return {
		type : TOGGLE_LIKE,
		postId
	};

};

export function likePostSuccess(postId,state){
	

	//now create an action
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
export function toggleBookmark(postId){

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

export function syncFeed(){
	return {
		type : SYNC_FEED
	};
};

// --------------------------- redux thunk -----------------------------------

export function toggleLikeRequest(id){

	return (dispatch,getState) => {
		let state = getState();
		
		dispatch(toggleLike(id));
		
		let request = null;

		if(state.blog.posts.byId[id].liked){
			request =  BlogApi.postUnlike(id);
		}
		else{
			request = BlogApi.postLike(id);
		}

		request.then(function(response){
			dispatch(likePostSuccess(id));
  		}).catch((err) => {
      		// dispatch(errorReceivingPost());
      	});
	}
};

export function toggleBookmarkRequest(id){

	return (dispatch,getState) => {
		let state = getState();

		dispatch(toggleBookmark(id));

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
			dispatch(bookmarkPostSuccess(id));
		}).catch((err) =>{
			//handle the error appropriately
		});

	}
};


export function fetchSinglePost(id,fields){

	return (dispatch,getState) => {
			
		dispatch(requestSinglePost(id));

		BlogApi.fetchSinglePost(id,fields).then(function(response){
  				const post = response.data;
  				dispatch(receivedSinglePost(id,post,getState()));
  	
  			}).catch((err) => {
      		dispatch(errorReceivingSinglePost(id));
      	});
	}
};

//posts for user feed, language dependant 
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

//language dependant 
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

//personalized posts, language dependant
export function fetchSlotPosts(key){
	
	return (dispatch,getState) => {

		// return if already requested
		const state = getState();
		if(state.blog.homepageSlotPosts.loading){
			return;
		}

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


//popular posts, language dependant
export function fetchPopularPosts(key){
	return (dispatch,getState) => {

		// return if already requested
		const state = getState();
		if(state.blog.popularPosts.loading){
			return;
		}

		dispatch(requestPosts(key));
		BlogApi.popularPosts().then(function(response){
  				let posts = response.data.posts;
  				dispatch(receivedPosts(key,posts));
     	}).catch((err) => {
      		dispatch(errorReceivingPosts(key));
      	});
	}
};

//editorial posts, language dependant
export function fetchEditorialPosts(key){
	
	return (dispatch,getState) => {
		// return if already requested
		const state = getState();
		if(state.blog.editorialPosts.loading){
			return;
		}

		dispatch(requestPosts(key));
		BlogApi.editorialPosts().then(function(response){
  				let posts = response.data.posts;
  				dispatch(receivedPosts(key,posts));
     	}).catch((err) => {
      		dispatch(errorReceivingPosts(key));
      	});
	}
};

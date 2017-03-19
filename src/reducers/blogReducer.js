import {REQUEST_USER_FEED_TIME,RECEIVED_USER_FEED_TIME,ERROR_FETCHING_USER_FEED_TIME,
REQUEST_USER_FEED_RELEVANCE,RECEIVED_USER_FEED_RELEVANCE,ERROR_FETCHING_USER_FEED_RELEVANCE,
RECEIVED_SINGLE_POST,REQUEST_SINGLE_POST,ERROR_FETCHING_SINGLE_POST,
TOGGLE_LIKE,POST_LIKE_SUCCESS,POST_LIKE_FAILURE,
REQUEST_POPULAR_POSTS,RECEIVED_POPULAR_POSTS,ERROR_FETCHING_POPULAR_POSTS,
REQUEST_EDITORIAL_POSTS,RECEIVED_EDITORIAL_POSTS,ERROR_FETCHING_EDITORIAL_POSTS,
POST_BOOKMARK_SUCCESS,TOGGLE_BOOKMARK,POST_BOOKMARK_FAILURE,
REQUEST_INTERESTS,RECEIVED_INTERESTS,ERROR_FETCHING_INTERESTS,TOGGLE_INTEREST,
REQUEST_BOOKMARKED_POSTS,RECEIVED_BOOKMARKED_POSTS,ERROR_FETCHING_BOOKMARKED_POSTS,
REQUEST_ARCHIVE_POSTS,RECEIVED_ARCHIVE_POSTS,ERROR_FETCHING_ARCHIVE_POSTS,
REQUEST_HOMEPAGE_SLOT_POSTS,RECEIVED_HOMEPAGE_SLOT_POSTS,ERROR_FETCHING_HOMEPAGE_SLOT_POSTS,
USER_FEED_RELEVANCE,USER_FEED_TIME,HOMEPAGE_SLOT_POSTS,BOOKMARKED_POSTS,
ARCHIVE_POSTS,POPULAR_POSTS,EDITORIAL_POSTS,UPDATE_BOOKMARKED_LIST,SYNC_FEED} from '../actions/blogActions';

const INITIAL_STATE = {
	'posts' : {
		'byId': {}
	},
	'interests' : { 'terms' : [],'loading' : false, 'error' : false},
	'activePost' : {'post': null,'loading':false,'error':false},
	[ARCHIVE_POSTS] : {},
	[BOOKMARKED_POSTS] : {'posts' : [],'loading' : false,'error' : false,exhausted : false},
	[USER_FEED_RELEVANCE] : {'posts' : [],'loading' : false,'error' : false,exhausted : false},
	[USER_FEED_TIME] : {'posts' : [],'loading' : false,'error' : false,exhausted : false},
	[HOMEPAGE_SLOT_POSTS] : {'posts' : [],'loading' : false,'error' : false},
	[POPULAR_POSTS] : {'posts' : [],'loading' : false,'error' : false},
	[EDITORIAL_POSTS] : {'posts' : [],'loading' : false,'error' : false}
};

//this will be called on success of all the posts recieve, more of a utility
const mergePosts = (posts,state) => {

	let newPostsObj = {};

	posts.forEach(function(post){
    	
    	newPostsObj[post.id] = post;
	});

	return Object.assign({},newPostsObj,state.posts.byId);
};

//update the master list
//then update the references to the master list
const updatePostsList = (posts,key,state) => {

  let mergedPosts = mergePosts(posts,state);
  let existingPosts = state[key].posts || [];
  const exhausted = posts.length < 10 ? true : false;

  posts = posts.filter(function(post){
  	return post && existingPosts.indexOf(post.id) === -1;
  });

 let updatedReferenceList = state[key].posts.concat(posts.map(function(post){
 	return post.id;
 })); 

 return Object.assign({},state,{posts : { byId : mergedPosts }},{[key] : Object.assign({},state[key],{posts: updatedReferenceList,loading : false,error : false,exhausted : exhausted})});

};

const requestArchivePosts = (term,key,state) => {
	let existingTerm = state[key][term] || {list : [],loading : false, error : false};
	return Object.assign({},state,{[key] : Object.assign({},state[ARCHIVE_POSTS],{[term] : Object.assign({},existingTerm,{loading : true,error : false})})});
};

const receivedArchivePosts = (posts,term,key,state) => {

	let mergedPosts = mergePosts(posts,state);
	
	const exhausted = posts.length < 10 ? true : false;

	let existingTerm = state[key][term] || {list : [],loading : false, error : false};

	let existingPosts = existingTerm.list;

	posts = posts.filter(function(post){
  		return post && existingPosts.indexOf(post.id) === -1;
    });

	let updatedReferenceList = existingPosts.concat(posts.map(function(post){
 		return post.id;
 	})); 

   return Object.assign({},state,{posts : { byId : mergedPosts }},{[key] : Object.assign({},state[key],{[term] : Object.assign({},existingTerm,{list : updatedReferenceList,loading : false,error : false,exhausted : exhausted})})});

};

const errorFetchingArchivePosts = (term,key,state) => {
	let existingTerm = state[key][term] || {list : [],loading : false, error : false};
	return Object.assign({},state,{[key] : Object.assign({},state[ARCHIVE_POSTS],{[term] : Object.assign({},existingTerm,{loading : false,error : true})})});
}; 

// request states for posts
const requestPosts = (key,state) => {
	return Object.assign({},state,{[key] : Object.assign({},state[key],{loading : true,error :false})});
};

// error state for posts
const errorFetchingPosts = (key,state) => {
	return Object.assign({},state,{[key] : Object.assign({},state[key],{loading : false,error :true})});
};


//request single post
const requestSinglePost = (postId,state) => {
	return Object.assign({},state,{activePost : Object.assign({},state.activePost, {post : null,loading : true, error : false})});
};


// Update the reference, and then update the master list
const setActivePost = (postId,postContent,relatedPosts,state) => {

	let mergedPosts = mergePosts(relatedPosts,state);

	relatedPosts = relatedPosts.map(function(post){
		return post.id;
	});

	//update the reference
	let activePost = Object.assign({},state.activePost,{post : postId,loading : false, error : false,loaded : true});

	state = Object.assign({},state,{posts : { byId : mergedPosts }});
	
	return Object.assign({},state,{posts : {byId: Object.assign({},state.posts.byId,{[postId] :  Object.assign({},state.posts.byId[postId],{ postContent : postContent,relatedPosts : relatedPosts })})}},{activePost : activePost});

};

//failure single post
const errorFetchingSinglePost = (postId,state) => {
	return Object.assign({},state,{activePost : Object.assign({},state.activePost, {post : null,loading : false, error : true})});
};


// ---------------- Bookmark and Like reducers -----------------------------
const toggleBookmark = (postId,state) => {
	//update the master list
	return Object.assign({},state,{posts : { byId : Object.assign({},state.posts.byId,{[postId] :  Object.assign({},state.posts.byId[postId],{ bookmarked : !state.posts.byId[postId].bookmarked })}) }});	
};

const toggleLike = (postId,state) => {
	//update the master list
  return Object.assign({},state,{posts : { byId : Object.assign({},state.posts.byId,{[postId] :  Object.assign({},state.posts.byId[postId],{ liked : !state.posts.byId[postId].liked })}) }});
};


//toggleInterest
const toggleInterests = (term,state) => {

	let interests =  state.interests.terms.map(function(interest){

	if(interest.term === term){
		return Object.assign({},interest,{isSelected : !interest.isSelected});
	}
		return interest;
	});

	return Object.assign({},state, {interests : Object.assign({},state.interests,{terms : interests,loading : false, error : false})});

};

//
const updateBookmarkedList = (postId,operation,state) => {

	let updatedList = [];

	console.log(operation);

	if(operation == '-'){
		updatedList = state[BOOKMARKED_POSTS].posts.filter(function(post){
  		return post != postId;
    });
	}
	if(operation == '+'){
		updatedList = [...state[BOOKMARKED_POSTS].posts,postId];
	}
 
	return Object.assign({},state, { [BOOKMARKED_POSTS] : Object.assign({},state[BOOKMARKED_POSTS],{ posts : updatedList})});
};


//avoid making a request multiple times
//should you make a like even before you get a response back from the server?

let blogReducer = (blog=INITIAL_STATE,action) => {
	
	switch(action.type) {

		//action types of homepage posts
		case REQUEST_USER_FEED_TIME : 
			return requestPosts(USER_FEED_TIME,blog);
		case RECEIVED_USER_FEED_TIME : 
			return updatePostsList(action.posts,USER_FEED_TIME,blog);
		case ERROR_FETCHING_USER_FEED_TIME : 
			return errorFetchingPosts(USER_FEED_TIME,blog);

		//action types of homepage posts
		case REQUEST_USER_FEED_RELEVANCE : 
			return requestPosts(USER_FEED_RELEVANCE,blog);
		case RECEIVED_USER_FEED_RELEVANCE : 
			return updatePostsList(action.posts,USER_FEED_RELEVANCE,blog);
		case ERROR_FETCHING_USER_FEED_RELEVANCE : 
			return errorFetchingPosts(USER_FEED_RELEVANCE,blog);

		//action types of homepage posts
		case REQUEST_POPULAR_POSTS : 
			return requestPosts(POPULAR_POSTS,blog);
		case RECEIVED_POPULAR_POSTS : 
			return updatePostsList(action.posts,POPULAR_POSTS,blog);
		case ERROR_FETCHING_POPULAR_POSTS : 
			return errorFetchingPosts(POPULAR_POSTS,blog);

		//action types of homepage posts
		case REQUEST_EDITORIAL_POSTS : 
			return requestPosts(EDITORIAL_POSTS,blog);
		case RECEIVED_EDITORIAL_POSTS : 
			return updatePostsList(action.posts,EDITORIAL_POSTS,blog);
		case ERROR_FETCHING_EDITORIAL_POSTS : 
			return errorFetchingPosts(EDITORIAL_POSTS,blog);

		//homepage slot posts
		case REQUEST_HOMEPAGE_SLOT_POSTS : 
			return requestPosts(HOMEPAGE_SLOT_POSTS,blog);
		case RECEIVED_HOMEPAGE_SLOT_POSTS : 
			return updatePostsList(action.posts,HOMEPAGE_SLOT_POSTS,blog);
		case ERROR_FETCHING_HOMEPAGE_SLOT_POSTS :
			return errorFetchingPosts(HOMEPAGE_SLOT_POSTS,blog);

		case REQUEST_BOOKMARKED_POSTS : 
			return requestPosts(BOOKMARKED_POSTS,blog);
		case RECEIVED_BOOKMARKED_POSTS : 
			return updatePostsList(action.posts,BOOKMARKED_POSTS,blog);
		case ERROR_FETCHING_BOOKMARKED_POSTS : 
			return errorFetchingPosts(BOOKMARKED_POSTS,blog);
		//archive posts
		case REQUEST_ARCHIVE_POSTS : 
		    return requestArchivePosts(action.term,ARCHIVE_POSTS,blog);
		case RECEIVED_ARCHIVE_POSTS : 
			return receivedArchivePosts(action.posts,action.term,ARCHIVE_POSTS,blog);
		case ERROR_FETCHING_ARCHIVE_POSTS :
			return errorFetchingArchivePosts(action.term,ARCHIVE_POSTS,blog);

		//action type of single post
		case RECEIVED_SINGLE_POST : 
			return setActivePost(action.postId,action.postContent,action.relatedPosts,blog);
		case REQUEST_SINGLE_POST : 	
			return requestSinglePost(action.postId,blog);
		case ERROR_FETCHING_SINGLE_POST : 
			return errorFetchingSinglePost(action.postId,blog);
		

		//interests
		case REQUEST_INTERESTS : 
			return Object.assign({},blog,{interests : Object.assign({},blog.interests,{loading : true, error : false})});
		case RECEIVED_INTERESTS : 
			return Object.assign({},blog, {interests : Object.assign({},blog.interests,{terms : action.interests,loading : false, error : false})});
		case ERROR_FETCHING_INTERESTS :
			return Object.assign({},blog, {interests : [],loading : false, error : true});

		case UPDATE_BOOKMARKED_LIST : 
			return updateBookmarkedList(action.postId,action.operation,blog);
		//toggle interest
		case TOGGLE_INTEREST : 
			return toggleInterests(action.term,blog);

		case TOGGLE_LIKE : 
			return toggleLike(action.postId,blog);

		case TOGGLE_BOOKMARK : 
			return toggleBookmark(action.postId,blog);

		case SYNC_FEED : 
			return Object.assign({},blog,{[USER_FEED_RELEVANCE] : Object.assign({},blog[USER_FEED_RELEVANCE],{posts:[]})},
			{[USER_FEED_TIME] : Object.assign({},blog[USER_FEED_TIME],{posts:[]})},
			{[HOMEPAGE_SLOT_POSTS] : Object.assign({},blog[HOMEPAGE_SLOT_POSTS],{posts:[]})}
			);

		// like post, TODO : as of now dont do anything
		case POST_LIKE_SUCCESS : 
			break;
		//bookmark post
		case POST_BOOKMARK_SUCCESS : 
			break;

		default : return blog;
	}
}

export default blogReducer;
import {generateCacheKey,isItemEmpty,hasUserInfoChanged,hasUserInterestsChanged} from '../utils';
import {fetchSlotPosts,fetchPosts,fetchPopularPosts,syncFeed} from '../actions/blogActions';
// slot posts
import {HOMEPAGE_SLOT_POSTS,USER_FEED_RELEVANCE,USER_FEED_TIME,POPULAR_POSTS} from '../constants';

// user interests
import {JOIN_CHATROOM,LEAVE_CHATROOM,UPDATE_USER_INFO_REQUEST,UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INTERESTS_REQUEST,UPDATE_USER_INTERESTS_SUCCESS,RESET_UNREAD_MESSAGES,USER_LOGOUT,
SLOT_POSTS_ENDPOINT,EDITORIAL_POSTS_ENDPOINT,POPULAR_POSTS_ENDPOINT,
BOOKMARKED_POSTS_ENDPOINT,FETCH_INTERESTS_ENDPOINT,LIST_CHAT_GROUPS_ENDPOINT} from '../constants';

const shouldUpdate = (store,action) => {
  const state = store.getState();
  const currentUserInfo = state.user.userInfo;
  const nextUserInfo = action.user;
  return hasUserInfoChanged(currentUserInfo,nextUserInfo); 
} 

const hasInterestsChanged = (store,action) => {
  
  const state = store.getState();
  const currentUserInterests = state.user.userInfo.interests;
  const nextUserInterests = action.interests;
  console.log(currentUserInterests);
  console.log(nextUserInterests);
  return hasUserInterestsChanged(currentUserInterests,nextUserInterests);

};


// sync feed should take keys

export const cacheMiddleware = store => next => action => {

    let urls = [];

    switch(action.type){
  
      case JOIN_CHATROOM :
      case LEAVE_CHATROOM : 
      case RESET_UNREAD_MESSAGES :
        urls.push(LIST_CHAT_GROUPS_ENDPOINT);
        break;
      
      case UPDATE_USER_INTERESTS_REQUEST : 
        urls.push(FETCH_INTERESTS_ENDPOINT);
        break;

      case UPDATE_USER_INFO_REQUEST : 
        urls.push(LIST_CHAT_GROUPS_ENDPOINT);
        urls.push(FETCH_INTERESTS_ENDPOINT);
        urls.push(SLOT_POSTS_ENDPOINT);
        urls.push(POPULAR_POSTS_ENDPOINT);
        break;

      case UPDATE_USER_INFO_SUCCESS :
        if(shouldUpdate(store,action)) {
          // remove data from the old store
          store.dispatch(syncFeed());
          store.dispatch(fetchSlotPosts(HOMEPAGE_SLOT_POSTS));
          store.dispatch(fetchPopularPosts(POPULAR_POSTS));
          store.dispatch(fetchPosts(USER_FEED_RELEVANCE,'relevance',0));
        } 
        break;

      case UPDATE_USER_INTERESTS_SUCCESS : 
      
       
       if(hasInterestsChanged(store,action)) {
          // remove data from the old store
          store.dispatch(syncFeed());
          store.dispatch(fetchPosts(USER_FEED_RELEVANCE,'relevance',0));
          store.dispatch(fetchPosts(USER_FEED_TIME,'time',0));
        } 
        break;
         
      case USER_LOGOUT : 
        urls.push(BOOKMARKED_POSTS_ENDPOINT);
        urls.push(FETCH_INTERESTS_ENDPOINT);
        urls.push(SLOT_POSTS_ENDPOINT);
        urls.push(LIST_CHAT_GROUPS_ENDPOINT);
        urls.push(POPULAR_POSTS_ENDPOINT);
        break;

    }

    urls.forEach((url) => {
      let cacheKey = generateCacheKey(url);
      if(cacheKey in window.localStorage){
        
        try{
           delete  window.localStorage[cacheKey];
           delete window.localStorage[cacheKey + ':ts'];
        }
        catch(e){
          //handle the error
        }
     }
   });

  next(action);

};


export default cacheMiddleware;
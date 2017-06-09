import {fetchSlotPosts,fetchPosts} from '../actions/blogActions';
import {fetchInterests} from '../actions/userInterestsActions';
// slot posts
import {HOMEPAGE_SLOT_POSTS,USER_FEED_RELEVANCE} from '../constants';
// user interests
import {LOGIN_USER_SUCCESS,UPDATE_USER_INTERESTS_SUCCESS,APP_INIT_REQUEST_SUCCESS} from '../constants';



const reconcile = (store) => {

  const state = store.getState();
  const user = state.user;
  const slotPosts = state.blog[HOMEPAGE_SLOT_POSTS];
  const userFeed = state.blog[USER_FEED_RELEVANCE];
  const userInterests = state.userInterests;
  
  if(user.userInfo.interests.length !== 0) return;
  !slotPosts.loading && slotPosts.posts.length == 0 && store.dispatch(fetchSlotPosts(HOMEPAGE_SLOT_POSTS)); 
  !userFeed.loading && userFeed.posts.length == 0 && store.dispatch(fetchPosts(USER_FEED_RELEVANCE,'relevance',0)); 
  !userInterests.loading && userInterests.interests.length == 0 && store.dispatch(fetchInterests()); 

};

export const dataReconcilationMiddleware = store => next => action => {

    let urls = [];

    switch(action.type){
  		
  	  case LOGIN_USER_SUCCESS:
  	  case APP_INIT_REQUEST_SUCCESS:
      case UPDATE_USER_INTERESTS_SUCCESS : 
	  // reconcile(store);
	  break;    

    }

  next(action);

};


export default dataReconcilationMiddleware;
import {generateCacheKey,isItemEmpty} from '../utils';

import {JOIN_CHATROOM,LEAVE_CHATROOM,UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INTERESTS_REQUEST,RESET_UNREAD_MESSAGES,USER_LOGOUT,
SLOT_POSTS_ENDPOINT,EDITORIAL_POSTS_ENDPOINT,POPULAR_POSTS_ENDPOINT,
BOOKMARKED_POSTS_ENDPOINT,FETCH_INTERESTS_ENDPOINT,LIST_CHAT_GROUPS_ENDPOINT} from '../constants';

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
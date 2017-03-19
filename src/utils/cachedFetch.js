import fetch from 'isomorphic-fetch'
import {GROUP_JOIN_UNJOIN,PROFILE_UPDATE,LIKED_BOOKMARKED,UPDATE_USER_INTERESTS,
SLOT_POSTS_ENDPOINT,EDITORIAL_POSTS_ENDPOINT,POPULAR_POSTS_ENDPOINT,
BOOKMARKED_POSTS_ENDPOINT,FETCH_INTERESTS_ENDPOINT,LIST_CHAT_GROUPS_ENDPOINT} from '../constants';

const generateCacheKey = (s) => {
  let hash = 0;
  if (s.length == 0) return hash;
  for (let i = 0; i < s.length; i++) {
    let char = s.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

/**
  => Update user interests => Get Interests Endpoint
  => Update user profile   =>  Slot posts
  => On Likes and Bookmarks => remove editorials,popular posts,slot posts,bookmarked posts
  =>   
**/

export const removeCache = (action) => {

    let urls = [];

    switch(action){
  
      case GROUP_JOIN_UNJOIN : 
        urls.push(LIST_CHAT_GROUPS_ENDPOINT);
        break;
      
      case UPDATE_USER_INTERESTS : 
        urls.push(FETCH_INTERESTS_ENDPOINT);
        break

      case PROFILE_UPDATE : 
        urls.push(SLOT_POSTS_ENDPOINT);
        break;
  
      case LIKED_BOOKMARKED : 
        urls.push(BOOKMARKED_POSTS_ENDPOINT);
        urls.push(POPULAR_POSTS_ENDPOINT);
        urls.push(EDITORIAL_POSTS_ENDPOINT);
        urls.push(SLOT_POSTS_ENDPOINT);
        break;
  
     }

 
  urls.forEach((url) => {
      let cacheKey = generateCacheKey(url);
      window.localStorage.removeItem(cacheKey)
      window.localStorage.removeItem(cacheKey + ':ts')
   });
   
 

};

//include headers
const cachedFetch = (url, options) => {

  let expiry = 5 * 60 // 5 min default
  if (typeof options === 'number') {
    expiry = options
    options = undefined
  } else if (typeof options === 'object') {
    // I hope you didn't set it to 0 seconds
    expiry = options.seconds || expiry
  }
  // Use the URL as the cache key to sessionStorage
  let cacheKey = generateCacheKey(url);
  let cached = localStorage.getItem(cacheKey)
  let whenCached = localStorage.getItem(cacheKey + ':ts')
  if (cached !== null && whenCached !== null) {
    // it was in sessionStorage! Yay!
    // Even though 'whenCached' is a string, this operation
    // works because the minus sign converts the
    // string to an integer and it will work.
    let age = (Date.now() - whenCached) / 1000
    if (age < expiry) {
      let response = new Response(new Blob([cached]))
      return Promise.resolve(response)
    } else {
      // We need to clean up this old key
      window.localStorage.removeItem(cacheKey)
      window.localStorage.removeItem(cacheKey + ':ts')
    }
  }

  return fetch(url, options).then(response => {
    // let's only store in cache if the content-type is
    // JSON or something non-binary
    if (response.status === 200) {
     
        response.clone().text().then(content => {
          localStorage.setItem(cacheKey, content)
          localStorage.setItem(cacheKey+':ts', Date.now())
        })
    }
    return response
  });
}
export default cachedFetch;
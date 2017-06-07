import fetch from 'fetch-retry';
import {generateCacheKey,isItemEmpty} from '../utils';


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
  let cached = null;

  try{
    cached = window.localStorage.getItem(cacheKey);  
  }
  catch(e){
    cached = null;
  }
  
 
  
  let whenCached = window.localStorage.getItem(cacheKey + ':ts')
  if (!isItemEmpty(cached) && whenCached !== null) {
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
    if (response.status === 200 && options.method == 'GET') {
     
        response.clone().json().then(content => {
          const status = content.success;
       
          if(status == true && !isItemEmpty(content)){
            
            content = JSON.stringify(content);
            
            try{
              window.localStorage.setItem(cacheKey, content);
              window.localStorage.setItem(cacheKey+':ts', Date.now());
            }
            catch(e){
              // console.log(e);
            }

              
          }
        })
    }
    return response
  });
}
export default cachedFetch;
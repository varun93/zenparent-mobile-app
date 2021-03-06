import fetch from 'fetch-retry';
import {getRequestUrl,prepareFormData} from '../utils'
import cachedFetch from '../utils/cachedFetch';
import {SINGLE_POST_ENDPOINT,POSTS_ENDPOINT,TERM_ARCHIVES_ENDPOINT,POST_BOOKMARK_ENDPOINT,
POST_LIKE_ENDPOINT,POST_UNLIKE_ENDPOINT,POST_UNBOOKMARK_ENDPOINT,
BOOKMARKED_POSTS_ENDPOINT,SLOT_POSTS_ENDPOINT,
AUTHOR_POSTS_ENDPOINT,POPULAR_POSTS_ENDPOINT,
EDITORIAL_POSTS_ENDPOINT,RECORD_USER_READING_HISTORY} from '../constants'


class BlogApi {

  static requestHeaders() {
    return {'AUTHORIZATION': `Bearer ${window.localStorage.jwt}`}
  }


  //verified
  static fetchPosts(filter,offset) {
    const headers = this.requestHeaders();
    const params = {filter,offset};
    const url = getRequestUrl(POSTS_ENDPOINT,params);

    const request = new Request(url, {
      method: 'GET',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    });
  }


  //verified
  static popularPosts() {

    const headers = this.requestHeaders();
  
    const options = {
      method: 'GET',
      headers: headers,
      seconds : 60*60*24,
      retries: 5,
      retryDelay: 2000
    };
    
    return cachedFetch(POPULAR_POSTS_ENDPOINT,options).then(r => {
      return r.json()
    }).catch(error => {
      return error
    });

  }

  //verified
  static editorialPosts() {
    const headers = this.requestHeaders();
    
    const options = {
      method: 'GET',
      headers: headers,
      seconds : 60*60*24,
      retries: 5,
      retryDelay: 2000
    };
    
    return cachedFetch(EDITORIAL_POSTS_ENDPOINT,options).then(r => {
      return r.json()
    }).catch(error => {
      return error
    });
  
  }


  //verified
  static fetchSinglePost(id,fields=[]) {
    
    const headers = this.requestHeaders();
    const params = {post_id : id,fields};
    const url = getRequestUrl(SINGLE_POST_ENDPOINT,params);

    const request = new Request(url,{
      method: 'GET',
      headers: headers,
      retries: 5,
      retryDelay: 2000
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  // verified, cache the term+url
  static archivePosts(term,offset){

    const headers = this.requestHeaders();
    const params = {term : term,offset : offset};
    const url = getRequestUrl(TERM_ARCHIVES_ENDPOINT,params);
    
    const request = new Request(url, {
      method: 'GET',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });

  }

  static slotPosts(){

    const headers = this.requestHeaders();

    const options = {
      method: 'GET',
      headers: headers,
      seconds : 60*60*24,
      retries: 5,
      retryDelay: 2000
    };
    
    return cachedFetch(SLOT_POSTS_ENDPOINT,options).then(r => {
      return r.json()
    }).catch(error => {
      return error
    });
  
  }
 
  //can cache
  static bookmarkedPosts(offset){

    const headers = this.requestHeaders();
    const params = {offset : offset};
    const url = getRequestUrl(BOOKMARKED_POSTS_ENDPOINT,params);

    const request = new Request(url, {
      method: 'GET',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });

  }


  static postLike(id){

    const headers = this.requestHeaders();

    const request = new Request(POST_LIKE_ENDPOINT, {
      method: 'POST',
      headers: headers, 
      body: prepareFormData({post_id : id})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
    
  }

  static postBookmark(id){

    const headers = this.requestHeaders();

    const request = new Request(POST_BOOKMARK_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: prepareFormData({post_id : id})
    });


    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    });

  }

  static postUnlike(id){

    const headers = this.requestHeaders();

    const request = new Request(POST_UNLIKE_ENDPOINT, {
      method: 'POST',
      headers: headers, 
      body: prepareFormData({post_id : id})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
    
  }

  static postUnbookmark(id){

    const headers = this.requestHeaders();

    const request = new Request(POST_UNBOOKMARK_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: prepareFormData({post_id : id})
    });


    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    });

  }


  static recordUserReadingHistory(id){

    const headers = this.requestHeaders();

    const request = new Request(RECORD_USER_READING_HISTORY, {
      method: 'POST',
      headers: headers,
      body: prepareFormData({post_id : id})
    });


    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    });

  }


}

export default BlogApi;
import fetch from 'fetch-retry';
import cachedFetch from '../utils/cachedFetch';
import {prepareFormData} from '../utils'
import {UPDATE_USER_INTERESTS_ENDPOINT,FETCH_INTERESTS_ENDPOINT} from '../constants'

class UserInterestsApi {
  
  static requestHeaders() {
    return {'AUTHORIZATION': `Bearer ${localStorage.jwt}`}
  }

  static fetchInterests() {
   
    const headers = this.requestHeaders();

    const options = {
      method: 'GET',
      headers: headers,
      seconds : 60*60*24,
      retries: 5,
      retryDelay: 2000
    };
    
    return cachedFetch(FETCH_INTERESTS_ENDPOINT,options).then(r => {
      return r.json()
    }).catch(error => {
      return error
    });
      

  }

  static updateUserInterests(interests) {

    const headers = this.requestHeaders();
    const request = new Request(UPDATE_USER_INTERESTS_ENDPOINT, {
      method: 'POST',
      headers: headers,
      retries: 5,
      retryDelay: 500,
      body: prepareFormData({interests : interests})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });

  }

}

export default UserInterestsApi;
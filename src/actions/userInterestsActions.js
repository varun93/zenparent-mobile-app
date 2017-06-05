//fetch interests
import UserInterestsApi from  '../api/UserInterestsApi';
import {removeCache} from '../utils/cachedFetch';
import {UserAnalytics} from '../utils/Analytics';
import {UPDATE_USER_INTERESTS,USER_INTERESTS_UPDATED} from '../constants';
import  {REQUEST_INTERESTS,RECEIVED_INTERESTS,ERROR_FETCHING_INTERESTS,TOGGLE_INTEREST,
UPDATE_USER_INTERESTS_REQUEST,UPDATE_USER_INTERESTS_FAILURE,UPDATE_USER_INTERESTS_SUCCESS} from '../constants';
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

};


//--------------- User Interests Actions -----------------------------
export function updateUserInterestsSuccess(interests,navigator){
 

   try{
      UserAnalytics(USER_INTERESTS_UPDATED);  
    }
    catch(e){
      console.log(e);
    }

  return {
    type : UPDATE_USER_INTERESTS_SUCCESS,
    interests,
    navigator
  }
};

export function updateUserInterestsRequest(){
  
  removeCache(UPDATE_USER_INTERESTS);

  return {
    type : UPDATE_USER_INTERESTS_REQUEST
  }
};

export function updateUserInterestsFailure(){
  return {
    type : UPDATE_USER_INTERESTS_FAILURE
  }
};



// --------------------------- redux thunk -----------------------------------
export function fetchInterests(){

	return (dispatch,getState) => {

		// return if already requested
		const state = getState();
		if(state.userInterests.interests.loading){
			return;
		}

		dispatch(requestInterests());
		UserInterestsApi.fetchInterests().then((response) => {
			let interests = response.data.interests;
			dispatch(fetchInterestsSuccess(interests));
		}).catch((error) => {
			// fetchInterests();
			dispatch(fetchInterestsFailure());
		});

	};
};


export function updateUserInterests(interests,navigator) {
    
      return (dispatch,state) => {
          
          dispatch(updateUserInterestsRequest());

          UserInterestsApi.updateUserInterests(interests).then(function(response){
              
              let interests = response.data.interests;
              dispatch(updateUserInterestsSuccess(interests,navigator));  
            
            }).catch((err) => {
                dispatch(updateUserInterestsFailure()); 
              });
      }
};

//fetch interests
import UserInterestsApi from '../api/UserInterestsApi';
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

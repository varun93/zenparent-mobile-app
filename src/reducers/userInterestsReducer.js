import  {REQUEST_INTERESTS,RECEIVED_INTERESTS,ERROR_FETCHING_INTERESTS,TOGGLE_INTEREST,
UPDATE_USER_INTERESTS_REQUEST,UPDATE_USER_INTERESTS_FAILURE,UPDATE_USER_INTERESTS_SUCCESS} from '../constants';

const INITIAL_STATE = {
	'interests' : { 'terms' : [],'loading' : false, 'error' : false},
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


const updateUserInterests = (interests,state) => {
    let userInfo = Object.assign({},state.userInfo,{interests : interests});
    return Object.assign({},state,{ userInfo :  userInfo},{status : 'interests-updated',loading : false});
};


let userInterestsReducer = (userInterests=INITIAL_STATE,action) => {
	
	switch(action.type) {

		case REQUEST_INTERESTS : 
			return Object.assign({},userInterests,{interests : Object.assign({},userInterests.interests,{loading : true, error : false})});
		case RECEIVED_INTERESTS : 
			return Object.assign({},userInterests, {interests : Object.assign({},userInterests.interests,{terms : action.interests,loading : false, error : false})});
		case ERROR_FETCHING_INTERESTS :
			return Object.assign({},userInterests, {interests : Object.assign({},userInterests.interests,{terms : [],loading : false, error : true})});
		case TOGGLE_INTEREST : 
			return toggleInterests(action.term,userInterests);

		//update user interests
	    case UPDATE_USER_INTERESTS_REQUEST :
	    	return Object.assign({},userInterests,{loading: true,error:null}); 
	    case UPDATE_USER_INTERESTS_SUCCESS:
	    	return updateUserInterests(action.interests,userInterests);
	    case UPDATE_USER_INTERESTS_FAILURE :
	    	return Object.assign({},userInterests,{error:action.message,loading: false});

		default : return userInterests;
	}
};

export default userInterestsReducer;
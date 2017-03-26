export const getRequestUrl = (url,params) => {

	var esc = encodeURIComponent;
	var query = Object.keys(params)
    	.map(k => esc(k) + '=' + esc(params[k]))
    	.join('&');
   
   return url + "?" + query;
};

export const prepareFormData = (params) => {

	var formData = new FormData();
	for (var k in params) {
    	formData.append(k, params[k]);
	}
	return formData;
};


// ----- business logic to fetch the post(s) ----------------
export const getPost = (postId, posts) => {
  return posts[postId];
};


export const getPosts = (postIds=[],posts) => {
	return postIds.map(function(postId){
		return posts[postId];
	});
};




// ------ business logic to fetch the chatroom(s) -----------
export const getChatrooms = (chatIds,chatRooms) => {

	return chatIds.map(function(id){
		return chatRooms[id];
	});

};

export const getChatroom = (chatroomId,chatRooms) => {
	return chatRooms[chatroomId];
};


// ---- few string utils ------------

export const ucFirstLetter = (interest) => {
	return interest.split(/\W/).map(function(term){ return term[0].toUpperCase() + term.slice(1)}).join(' ');
};


// ----- generate a random key for navigator --------
export const generateNavigationKey = (id) => {

	let key = Math.random();
	key = Math.floor(key*100000);
    key = key.toString();
    return key + id;
};

// ----- validations -----------
export const isFieldEmpty = (value) => {
      return (value === null || value === undefined || value.length === 0 || !value);
};

export const validateEmail = (value) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
};

export const validateDate = (date) => {

	if(isFieldEmpty(date)) {
		return false;
	}

	date = new Date(date).getTime();
	let currentDate = new Date().getTime();
	let isValid = true;
	let diffInDays = Math.abs(currentDate - date)/(1000*3600*24);


	//this is for due date
	if(date > currentDate){
		isValid = diffInDays < 280 ?  true : false;
	}
	
	return isValid;
};

// -------- Convert date to words ------------
export const convertDateToWords = (date) => {
	let monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
	
	if(date === null || date === undefined || date.trim().length == 0){
		return '';
	}

	let splitCharacter = '-';
	
	if(date.indexOf('/') !== -1){
		splitCharacter = '/';
	}

	return date.split(splitCharacter).map(function(datePart,index){

		if(index == 0 || index == 2){
			return datePart;
		}
		if(index == 1){
			datePart = parseInt(datePart)-1;
			return monthNames[datePart];
		}
		
	}).reverse().join(' ');
};



//--- has user info changed

export const hasUserInfoChanged = (currentUserInfo,nextUserInfo) => {

	const currentStageOfParenting = currentUserInfo.stage_of_parenting;
	const nextStageOfParenting  = nextUserInfo.stage_of_parenting;
	const currentUserInterests  = currentUserInfo.interests;
	const nextUserInterests = nextUserInfo.interests;
	
	const interestsSame = (!isFieldEmpty(currentUserInterests) && !isFieldEmpty(nextUserInterests)) && (currentUserInterests.length == nextUserInterests.length) && currentUserInterests.every(function(element, index) {
    	return element === nextUserInterests[index]; 
	});
		
	if(currentStageOfParenting !== nextStageOfParenting){
		return true;
	}

	const dateKey = currentStageOfParenting == 'parent' ? 'dob' : 'due_date';

	return (currentUserInfo[dateKey] !== nextUserInfo[dateKey]) || (!interestsSame);

};


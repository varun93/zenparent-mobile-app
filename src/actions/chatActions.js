import ChatroomApi from '../api/ChatroomApi';
import {removeCache} from '../utils/cachedFetch';
import {NEW_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_REQUEST,RECEIVED_CHATROOM_MESSAGES,
REQUEST_CHATROOM_MESSAGES,ERROR_FETCHING_CHATROOM_MESSAGES,
REQUEST_CHATROOMS,RECEIVED_CHATROOMS,ERROR_FETCHING_CHATROOMS,JOIN_CHATROOM,
LEAVE_CHATROOM,SET_ACTIVE_CHATROOM,RESET_UNREAD_MESSAGES,
GROUP_JOIN_UNJOIN,CHATROOM_OPENED} from 
'../constants';	


export function resetUnreadMessages(chatroomId){

	// remove cache
	removeCache(CHATROOM_OPENED);

	//clear in the local storage too
	return {
		type : RESET_UNREAD_MESSAGES,
		chatroomId
	}

};

export function setActiveChatRoom(chatroomId){
	return {
		type : SET_ACTIVE_CHATROOM,
		chatroomId
	}
};


// ----------------------- FETCH CHATROOM RELATED ACTIONS ------------------------
export function requestChatrooms(){
	return {
		type : REQUEST_CHATROOMS
	}
};


export function receivedChatrooms(chatrooms){
	return {
		type : RECEIVED_CHATROOMS,
		chatrooms
	}
};

export function errorReceivingChatrooms(){
	return {
		type : ERROR_FETCHING_CHATROOMS
	}
};


// ----------------------- FETCH CHATROOM MESSAGES RELATED ACTIONS ------------------------
export function requestChatroomMessages(chatroomId){
	return {
		type : REQUEST_CHATROOM_MESSAGES,
		chatroomId
	}
};

export function receivedChatroomMessages(chatroomId,messages){
	return {
		type : RECEIVED_CHATROOM_MESSAGES,
		chatroomId,
		messages
	}
};

export function errorReceivingChatroomMessages(chatroomId){
	return {
		type : ERROR_FETCHING_CHATROOM_MESSAGES,
		chatroomId
	}
};


// ----------------------- FETCH CHATROOM MESSAGES RELATED ACTIONS ------------------------

export function sendMessageRequest(chatroomId){
	return {
		type : SEND_MESSAGE_REQUEST,
		chatroomId
	};
};

export function sendMessageSuccess(chatroomId,state){
	
  	return {
		type : SEND_MESSAGE_SUCCESS,
		chatroomId 
	};
};


export function sendMessageFailure(chatroomId){
	return {
		type : SEND_MESSAGE_FAILURE,
		chatroomId 
	};
};


export function newMessage(chatroomId,message){

	return {
		type : NEW_MESSAGE,
		chatroomId,
		message
	}

};

// ----------------------- Join Group and leave group ------------------------
export function joinChatroomSuccess(chatroomId,state){
	
	return {
		type : JOIN_CHATROOM,
		chatroomId
	}
};

export function leaveChatroomSuccess(chatroomId,state){

	return {
		type : LEAVE_CHATROOM,
		chatroomId
	}
};


export function sendMessage(message,payloadType,chatroomId){
	
	return (dispatch,getState) => {
		dispatch(sendMessageRequest(chatroomId));
		
		ChatroomApi.sendMessage(message,payloadType,chatroomId).then((response) => {
		if(response.success){
			dispatch(sendMessageSuccess(chatroomId,getState()));
		}
	}).catch( (err) => {
			dispatch(sendMessageFailure(chatroomId));
		});

	};	

}

export function joinChatroom(chatroomId){

	return (dispatch,getState) => {
			
		//clear the cache
		removeCache(GROUP_JOIN_UNJOIN);
		
		ChatroomApi.joinChatroom(chatroomId).then(function(response){
  			// console.log(response);
  			let chatroomId = response.data.group_id;
  			dispatch(joinChatroomSuccess(chatroomId,getState()));
     	
     	}).catch((err) => {
      		// dispatch(errorReceivingPost());//
      	});
	};
};


//------- leave chatroom request -------- //
export function leaveChatroom(chatroomId){

	return (dispatch,getState) => {

		//clear the cache
		removeCache(GROUP_JOIN_UNJOIN);
		ChatroomApi.leaveChatroom(chatroomId).then(function(response){
  		
  			let chatroomId = response.data.group_id;
  			dispatch(leaveChatroomSuccess(chatroomId,getState()));
     	
     	}).catch((err) => {
      		// dispatch(errorReceivingPost());
      	});
	}
};

//------- fetch chatroom messages -------- //
export function fetchChatroomMessages(chatroomId,messageId,direction){

	return (dispatch,state) => {
		dispatch(requestChatroomMessages(chatroomId));
		ChatroomApi.listMessages(chatroomId,messageId,direction).then(function(response){

  			let chatroomId = response.data.group_id;
  			let messages = response.data.messages;
  			dispatch(receivedChatroomMessages(chatroomId,messages));
     	}).catch((err) => {
      		dispatch(errorReceivingChatroomMessages(chatroomId));
      	});
	}

};

//---------- fetch chatrooms request --------//
export function fetchChatrooms(){
	
	return (dispatch,state) => {
		dispatch(requestChatrooms());
		ChatroomApi.listChatrooms().then(function(response){
  				dispatch(receivedChatrooms(response.data));
     	}).catch((err) => {
      		dispatch(errorReceivingChatrooms());
      	});
	}	

};

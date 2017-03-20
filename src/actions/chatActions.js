import ChatroomApi from '../api/ChatroomApi';

//send new message
export const NEW_MESSAGE = 'NEW_MESSAGE';
// messages actions
export const RECEIVED_CHATROOM_MESSAGES = 'RECEIVED_CHATROOM_MESSAGES';
export const REQUEST_CHATROOM_MESSAGES = 'REQUEST_CHATROOM_MESSAGES';
export const ERROR_FETCHING_CHATROOM_MESSAGES = 'ERROR_FETCHING_CHATROOM_MESSAGES';

// join and leave chatroom
export const JOIN_CHATROOM = 'JOIN_CHATROOM';
export const LEAVE_CHATROOM = 'LEAVE_CHATROOM';

//open chatroom
export const SET_ACTIVE_CHATROOM = 'SET_ACTIVE_CHATROOM';

//send message 
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

// request chatrooms
export const REQUEST_CHATROOMS = 'REQUEST_CHATROOMS';
export const RECEIVED_CHATROOMS = 'RECEIVED_CHATROOMS';
export const ERROR_FETCHING_CHATROOMS = 'ERROR_FETCHING_CHATROOMS';

import {removeCache} from '../utils/cachedFetch';
import {GROUP_JOIN_UNJOIN} from '../constants';


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

export function sendMessageSuccess(chatroomId){
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
export function joinChatroomSuccess(chatroomId){
	return {
		type : JOIN_CHATROOM,
		chatroomId
	}
};

export function leaveChatroomSuccess(chatroomId){
	return {
		type : LEAVE_CHATROOM,
		chatroomId
	}
};


export function sendMessage(message,payloadType,chatroomId){
	
	return (dispatch,state) => {
		dispatch(sendMessageRequest(chatroomId));
		
		ChatroomApi.sendMessage(message,payloadType,chatroomId).then((response) => {
		if(response.success){
			dispatch(sendMessageSuccess(chatroomId));
		}
	}).catch( (err) => {
			dispatch(sendMessageFailure(chatroomId));
		});

	};	

}

export function joinChatroom(chatroomId){

	return (dispatch,state) => {
			
		//clear the cache
		removeCache(GROUP_JOIN_UNJOIN);
		
		ChatroomApi.joinChatroom(chatroomId).then(function(response){
  			// console.log(response);
  			let chatroomId = response.data.group_id;
  			dispatch(joinChatroomSuccess(chatroomId));
     	
     	}).catch((err) => {
      		// dispatch(errorReceivingPost());//
      	});
	};
};


//------- leave chatroom request -------- //
export function leaveChatroom(chatroomId){

	return (dispatch,state) => {

		//clear the cache
		removeCache(GROUP_JOIN_UNJOIN);
		ChatroomApi.leaveChatroom(chatroomId).then(function(response){
  		
  			let chatroomId = response.data.group_id;
  			dispatch(leaveChatroomSuccess(chatroomId));
     	
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

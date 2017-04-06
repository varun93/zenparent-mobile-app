import {NEW_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_REQUEST,RECEIVED_CHATROOM_MESSAGES,REQUEST_CHATROOM_MESSAGES,ERROR_FETCHING_CHATROOM_MESSAGES,
REQUEST_CHATROOMS,RECEIVED_CHATROOMS,ERROR_FETCHING_CHATROOMS,JOIN_CHATROOM,LEAVE_CHATROOM,SET_ACTIVE_CHATROOM} from 
'../actions/chatActions';	
//the loading false and error is mainly for the messages, chatroom will be an integer
const INITIAL_STATE =  {
	chatRooms: {
		byId : {},
		loading : false,
		error : null
	},
	recommendedGroups : [],
	joinedGroups : [],
	expertChats : []
};

//chatroom related reducers
const requestChatrooms = (state) => {
	return Object.assign({},state,{chatRooms:  Object.assign({},state.chatRooms, {loading : true, error : false})});
};

const mergeChatrooms = (chatrooms,state) => {

	let chatRoomObj = {};

	chatrooms.recommended_groups.concat(chatrooms.joined_groups).concat(chatrooms.expert_groups).forEach(function(chatroom){
		chatRoomObj[chatroom.post_id] = Object.assign({},chatroom,{messages : {list : [],loading : false, error : false}});
	});

	return Object.assign({},state.chatRooms.byId,chatRoomObj);
};

//chatroom related reducers, temporary fix by directly assigning the groups
const populateChatrooms = (chatrooms,state) => {

	let mergedChatrooms = mergeChatrooms(chatrooms,state);
	let recommendedGroups = [],joinedGroups = [], expertGroups = [];

	if(chatrooms){

		recommendedGroups =  chatrooms.recommended_groups.map(function(chatroom){
			return parseInt(chatroom.post_id);
		});

		joinedGroups = chatrooms.joined_groups.map(function(chatroom){
			return parseInt(chatroom.post_id);
		});

		expertGroups = chatrooms.expert_groups.map(function(chatroom){
			return parseInt(chatroom.post_id);
		});

	}

	return Object.assign({},state,{ 
		chatRooms : {
			byId : mergedChatrooms,
			loading : false,
			error : null
		}},
		{expertChats : expertGroups},
		{joinedGroups},
		{recommendedGroups}
	);

};

const errorFetchingChatrooms = (state) => {
	return Object.assign({},state,{chatRooms:  Object.assign({} : state.chatrooms, {loading : false, error : true})});
};

//chatroom-messages related reducers 
const uniquify = (messages) => {
	return messages.filter((message, index, self) => self.findIndex((m) => {return m.id === message.id}) === index);
};

const requestChatroomMessages = (chatroomId,state) => {
	return Object.assign({},state,{chatRooms : { byId : Object.assign({},state.chatRooms.byId,{[chatroomId] :  Object.assign({},state.chatRooms.byId[chatroomId],{ messages : Object.assign({},state.chatRooms.byId[chatroomId].messages,{loading : true,error : false,exhausted : false})})}) }});
};

const updateChatroomMessages = (messages,chatroomId,state) => {
  let chatRoomMessages = state.chatRooms.byId[chatroomId].messages.list || []; 
  const exhausted = messages.length < 25 ? true : false;
  messages = chatRoomMessages.concat(messages);
  messages = uniquify(messages);
  messages.sort((a,b) => {return (b.time < a.time) ? 1 : (b.time > a.time) ? -1 : 0});
  return Object.assign({},state,{chatRooms : { byId : Object.assign({},state.chatRooms.byId,{[chatroomId] :  Object.assign({},state.chatRooms.byId[chatroomId],{ messages : Object.assign({},state.chatRooms.byId[chatroomId].messages,{list : messages,loading : false,error : false,exhausted : exhausted})})}) }});
};

const errorFetchingChatroomMessages = (chatroomId,state) => {
	return Object.assign({},state,{chatRooms : { byId	 : Object.assign({},state.chatRooms.byId,{[chatroomId] :  Object.assign({},state.chatRooms.byId[chatroomId],{ messages : Object.assign({},state.chatRooms.byId[chatroomId].messages,{loading : false,error : true,exhausted : true })})}) }});
};

//as off now nothing
const sendMessageRequest = (chatroomId,state) => {
	return Object.assign({},state,{chatRooms : { byId	 : Object.assign({},state.chatRooms.byId,{[chatroomId] :  Object.assign({},state.chatRooms.byId[chatroomId],{messageSending : true,messageSent : false})}) }});
};

const sendMessageSuccess = (chatroomId,state) => {
	return Object.assign({},state,{chatRooms : { byId : Object.assign({},state.chatRooms.byId,{[chatroomId] :  Object.assign({},state.chatRooms.byId[chatroomId],{messageSending : false,messageSent : true})}) }});
};


const joinChatroom = (chatroomId,state) => {

	chatroomId = parseInt(chatroomId);

	let recommendedGroups = state.recommendedGroups.filter(function(id){
		return id !== chatroomId;
	});

	let joinedGroups = [...state.joinedGroups,chatroomId];

	return Object.assign({},state,{
 		joinedGroups : joinedGroups,
		recommendedGroups : recommendedGroups
	});

};

const leaveChatroom = (chatroomId,state) => {

	chatroomId = parseInt(chatroomId);
	
	let joinedGroups = state.joinedGroups.filter(function(id){
		return id !== chatroomId;
	});

	let recommendedGroups = [...state.recommendedGroups,chatroomId];

	return Object.assign({},state,{
 		joinedGroups : joinedGroups,
		recommendedGroups : recommendedGroups
	});
}



let chatReducer = function(chat = INITIAL_STATE, action) {
  switch (action.type) {

  	//action types of homepage posts
	case RECEIVED_CHATROOMS : 
		return populateChatrooms(action.chatrooms,chat);
	case REQUEST_CHATROOMS : 
		return requestChatrooms(chat);
	case ERROR_FETCHING_CHATROOMS : 
		return errorFetchingChatrooms(chat);


	//action types of homepage posts
	case REQUEST_CHATROOM_MESSAGES : 
		return requestChatroomMessages(action.chatroomId,chat);
	case RECEIVED_CHATROOM_MESSAGES : 
		return updateChatroomMessages(action.messages,action.chatroomId,chat);
	case ERROR_FETCHING_CHATROOM_MESSAGES : 
		return errorFetchingChatroomMessages(action.chatroomId,chat);

	//join and leave chatroom
	case JOIN_CHATROOM :
		return joinChatroom(action.chatroomId,chat);
	case LEAVE_CHATROOM : 
		return leaveChatroom(action.chatroomId,chat); 

	//new message 
	case NEW_MESSAGE : 
		const chatroomId = action.chatroomId;
		const message = action.message;
	    const chatRoomMessages = chat.chatRooms.byId[chatroomId].messages.list || []; 
		return Object.assign({},chat,{chatRooms : { byId : Object.assign({},chat.chatRooms.byId,{[chatroomId] :  Object.assign({},chat.chatRooms.byId[chatroomId],{ messages : Object.assign({},chat.chatRooms.byId[chatroomId].messages,{list : chatRoomMessages.concat(message)})})}) }});

	
	case SEND_MESSAGE_SUCCESS : 
		return sendMessageSuccess(action.chatroomId,chat);
	case SEND_MESSAGE_REQUEST : 
		return sendMessageRequest(action.chatroomId,chat);

	//default 
	default : return chat;

  }

};

export default chatReducer;
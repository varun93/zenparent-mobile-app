import React,{Component} from 'react';
import {connect} from 'react-redux';
import MessageList from '../components/MessageList';
import {fetchChatroomMessages,newMessage,recordLastChatroomActivity} from '../actions/chatActions';

const mapDispactorToProps = (dispatch,ownProps) => { 
	return {
		 fetchChatroomMessages : (chatroomId,messageId,direction) => dispatch(fetchChatroomMessages(chatroomId,messageId,direction)),
		 newMessage : (chatroomId,message) =>  dispatch(newMessage(chatroomId,message))
}};

const mapStateToProps = (state,ownProps) => {
	return {
		messageSending : state.chat.chatRooms.byId[ownProps.chatroomId].messageSending,
		currentUser : state.user.userInfo.id,
		chatroom : state.chat.chatRooms.byId[ownProps.chatroomId],
		chatroomId : ownProps.chatroomId,
		navigator : ownProps.navigator
}};

export default connect(mapStateToProps,mapDispactorToProps)(MessageList);
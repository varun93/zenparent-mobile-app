import React,{Component} from 'react';
import {connect} from 'react-redux';
import ChatroomsList from '../components/ChatroomsList';
import {fetchChatrooms,joinChatroom,leaveChatroom} from '../actions/chatActions';
import {EXPERT_CHAT,JOINED_GROUPS,RECOMMENDED_GROUPS} from '../constants';
import {getChatrooms} from '../utils';

class ChatroomListContainer extends Component {

	componentDidMount(){
		this.props.fetchChatrooms();
	}

	componentDidReceiveProps(nextProps){
		if(nextProps.updated){
			this.props.fetchChatrooms();
		}
	}

	render(){

		  let {loading,navigator,joinedGroups,expertGroups,recommendedGroups,joinChatroom} = this.props;

		  return (
		  	<div>
				<ChatroomsList title="Joined Groups" type={JOINED_GROUPS} navigator={navigator} groups={joinedGroups} />
				<ChatroomsList title="Recommended Groups" joinChatroom={joinChatroom} type={RECOMMENDED_GROUPS} navigator={navigator} groups={recommendedGroups} />
				<ChatroomsList title="Expert Chat" type={EXPERT_CHAT} navigator={navigator} groups={expertGroups} />
			</div>
		 )
	}
} 

const mapDispactorToProps = (dispatch) => { 
	return {
		fetchChatrooms : () => dispatch(fetchChatrooms()),
		joinChatroom : (id) => dispatch(joinChatroom(id)),
		leaveChatroom : (id) => dispatch(leaveChatroom(id))
}};

const mapStateToProps = (state) => {
	return {
		loading  : state.chat.chatRooms.loading,
		chatRooms :  state.chat.chatRooms.byId,
		expertGroups : getChatrooms(state.chat.expertChats,state.chat.chatRooms.byId),
		recommendedGroups : getChatrooms(state.chat.recommendedGroups,state.chat.chatRooms.byId),
		joinedGroups : getChatrooms(state.chat.joinedGroups,state.chat.chatRooms.byId)
}};

export default connect(mapStateToProps,mapDispactorToProps)(ChatroomListContainer)



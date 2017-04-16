import React,{Component} from 'react';
import {ProgressCircular} from 'react-onsenui';
import {connect} from 'react-redux';
import ChatroomsList from '../components/ChatroomsList';
import {fetchChatrooms,joinChatroom,leaveChatroom,resetUnreadMessages} from '../actions/chatActions';
import {EXPERT_CHAT,JOINED_GROUPS,RECOMMENDED_GROUPS} from '../constants';
import {getChatrooms} from '../utils';

class ChatroomListContainer extends Component {

	constructor(props,context){
		super(props,context);
		this.state = {
			loaded : false
		};
	}

	
	componentWillReceiveProps(nextProps){

		const loaded = this.state.loaded;
		const active = nextProps.active;

		if(!loaded && active){
			this.props.fetchChatrooms();
			this.setState({loaded : true});
		}

	}

	render(){

		  let {loading,navigator,joinedGroups,expertGroups,resetUnreadMessages,recommendedGroups,joinChatroom} = this.props;

		  if(loading){
		  	return (<ProgressCircular style={{position: "absolute",top: "45%",left: "45%"}}  inderterminate />)	
		  }
		  
		 return (
		  	<div>
				<ChatroomsList title="Joined Groups"  resetUnreadMessages={resetUnreadMessages} loading={loading} type={JOINED_GROUPS} navigator={navigator} groups={joinedGroups} />
				<ChatroomsList title="Recommended Groups" loading={loading} joinChatroom={joinChatroom} type={RECOMMENDED_GROUPS} navigator={navigator} groups={recommendedGroups} />
				<ChatroomsList title="Expert Chat" resetUnreadMessages={resetUnreadMessages} type={EXPERT_CHAT} loading={loading} navigator={navigator} groups={expertGroups} />
			</div>
		 )
	}
} 

const mapDispactorToProps = (dispatch) => { 
	return {
		fetchChatrooms : () => dispatch(fetchChatrooms()),
		joinChatroom : (id) => dispatch(joinChatroom(id)),
		leaveChatroom : (id) => dispatch(leaveChatroom(id)),
		resetUnreadMessages : (id) => dispatch(resetUnreadMessages(id))
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



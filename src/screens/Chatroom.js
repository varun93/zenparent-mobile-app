import React,{Component} from 'react';
import {Page} from 'react-onsenui';
import {connect} from 'react-redux';
import ChatHeader from '../components/ChatHeader';
import MessageListContainer from '../containers/MessageListContainer';
import InputBoxPaneContainer from '../containers/InputBoxPaneContainer';
import ChatroomApi from '../api/ChatroomApi';
import {getChatroom} from '../utils';
import {leaveChatroom} from '../actions/chatActions';

class Chatroom extends Component{

	constructor(props,context){
		super(props,context);
	}

	componentDidMount(){
		this.recordLastActivity.call(this);
	}

	recordLastActivity() {  

      const chatroomId = this.props.chatroomId; 
      
      ChatroomApi.recordLastChatroomActivity(chatroomId).then((response) => {

      	setTimeout(this.recordLastActivity.bind(this),45000);

      }).catch((err) => {

      });

    
	};


	render(){
		return (
			<Page className="chatroom" key='chatroom'>
			    <ChatHeader chatroomId={this.props.chatroomId} title={this.props.title} leaveChatroom={this.props.leaveChatroom} navigator={this.props.navigator} /> 
				<MessageListContainer chatroomId={this.props.chatroomId}  navigator={this.props.navigator} />
				<InputBoxPaneContainer chatroomId={this.props.chatroomId} />
			</Page>
		)
	}
}

const mapDispactorToProps = (dispatch) => { 
	return {
		 leaveChatroom : (id) => dispatch(leaveChatroom(id))
}};

const mapStateToProps = (state,ownProps) => {
	return {
		chatroomId :  ownProps.chatroomId,
		title : state.chat.chatRooms.byId[ownProps.chatroomId].post_title
}};

export default connect(mapStateToProps,mapDispactorToProps)(Chatroom)
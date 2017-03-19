import React,{Component} from 'react';
import {connect} from 'react-redux';
import InputBoxPane from '../components/InputBoxPane';
import {sendMessage} from '../actions/chatActions';

class InputBoxPaneContainer extends Component {

	

	render(){

        const {chatroomId,sendMessage,messageSent} = this.props;

		return (
			<InputBoxPane messageSent={messageSent} chatroomId={chatroomId} sendMessage={sendMessage} />
		 )			
	}
} 

const mapStateToProps = (state,ownProps) => {
	return {
		messageSent : state.chat.chatRooms.byId[ownProps.chatroomId].messageSent
	}
};

const mapDispactorToProps = (dispatch) => { 
	return {
		 sendMessage : (message,payloadType,chatroomId) => dispatch(sendMessage(message,payloadType,chatroomId))
}};

export default connect(mapStateToProps,mapDispactorToProps)(InputBoxPaneContainer)



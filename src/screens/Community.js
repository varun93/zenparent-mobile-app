import React,{Component} from 'react';
import {Page} from 'react-onsenui';
import {hasUserInfoChanged} from '../utils';
import ChatroomListContainer from '../containers/ChatroomListContainer';

export default class Community extends Component{

	constructor(context,props){
		super(context,props);
		this.state = {
			update : false
		};
	}	

	render(){

		const {user} = this.props;
		const userAuthenticated = user.authenticated;

		return (
			<Page key='community'>
			 {userAuthenticated && <ChatroomListContainer active={this.props.active} navigator={this.props.navigator} update={this.state.update} />} 
			</Page>
			)
	}
}

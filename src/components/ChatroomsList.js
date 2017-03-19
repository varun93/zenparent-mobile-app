import React,{Component} from 'react';
import {ListHeader,List} from 'react-onsenui';
import RecommendedGroupListItem from '../templates/RecommendedGroupListItem';
import JoinedGroupListItem from '../templates/JoinedGroupListItem';
import ExpertChatListItem from '../templates/ExpertChatListItem';
import {RECOMMENDED_GROUPS,JOINED_GROUPS,EXPERT_CHAT} from '../constants';
require('../styles/chatroom-listing.css');

export default class ChatroomList extends Component{

	constructor(props,context){
		super(props,context);
	}

	renderGroupItem(group){
		if(this.props.type == RECOMMENDED_GROUPS) return (<RecommendedGroupListItem key={group.post_id} item={group} navigator={this.props.navigator} joinChatroom={this.props.joinChatroom} /> );
		if(this.props.type == JOINED_GROUPS) return (<JoinedGroupListItem key={group.post_id} setActiveChatRoom={this.props.setActiveChatRoom} item={group} navigator={this.props.navigator} /> );
		if(this.props.type == EXPERT_CHAT) return (<ExpertChatListItem setActiveChatRoom={this.props.setActiveChatRoom} key={group.post_id} item={group} navigator={this.props.navigator} /> );
		return (<div>Others</div>)
	}

	renderHeader(){

		return (
		    <ListHeader style={{paddingLeft : "0px"}}>
		 		<p style={{color:"rgb(132,116,159)",textAlign:"left",fontWeight : "bold" }}>
		 			{this.props.title}</p>
		 	</ListHeader>
		)

	}

	render(){

		if(this.props.groups.length)
		{
			return (

			<List className="chatroom-listing" 
		 		style={{borderBottom: "none"}}  
		 		dataSource={this.props.groups} 
				renderRow={this.renderGroupItem.bind(this)}  
		 		renderHeader={this.renderHeader.bind(this)}  />
			)	
		}
		
		return(<div></div>)
		 
	}


}

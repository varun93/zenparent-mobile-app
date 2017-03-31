import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {ProgressCircular} from 'react-onsenui';
import Pusher from 'pusher-js';
import {PUSHER_APP_KEY} from '../constants';
import Waypoint from 'react-waypoint';
import ChatMessageItem from '../templates/ChatMessageItem';
require('../styles/message-list.css');

export default class MessageList extends Component {
  

  constructor(props,context){

    super(props,context);
    
    this.scrollAtBottom = true;
   
    this.pusher = new Pusher(PUSHER_APP_KEY, {
            cluster: 'ap1',
            encrypted: true
        });

    // Subscribe to the channel 
    const channel_name = 'chat_group_' + this.props.chatroomId;
    this.chatroom = this.pusher.subscribe(channel_name,this);

  }

  componentDidMount(){

    //fetch chatroom messages, intially load the messages 
    this.props.fetchChatroomMessages(this.props.chatroomId,0,'>');

    this.chatroom.bind('pusher:subscription_succeeded',() =>  {this.props.fetchChatroomMessages(this.props.chatroomId,0,'>')}, this);
      this.chatroom.bind('new_message', function(data){
        this.props.newMessage(this.props.chatroomId,data);
    }.bind(this));
    
 }


  componentWillUpdate(nextProps) {

    this.historyChanged = nextProps.chatroom.messages.list.length !== this.props.chatroom.messages.list.length;

    if (this.historyChanged) {
      const { messageList } = this.refs;
      const scrollPos = messageList.scrollTop;
      const scrollBottom = (messageList.scrollHeight - messageList.clientHeight);
      this.scrollAtBottom = (scrollBottom === 0) || (scrollPos === scrollBottom);
      if (!this.scrollAtBottom) {
        const numMessages = messageList.childNodes.length;
        this.topMessage = numMessages === 0 ? null : messageList.childNodes[0];
      }
    }

  }

  componentDidUpdate(){
   
    if (this.historyChanged) {
      if (this.scrollAtBottom) {
        this.scrollToBottom();
      }
      if (this.topMessage) {
       ReactDOM.findDOMNode(this.topMessage).scrollIntoView();
      }
    }

  }


  scrollToBottom(){
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  onScroll(){
    
    const { refs} = this;
    const {chatroom,fetchChatroomMessages} = this.props;
    const scrollTop = refs.messageList.scrollTop;
    
    if(chatroom.messages.exhausted || chatroom.messages.loading){
      return;
    }

    if (scrollTop === 0) {
      const offset = chatroom.messages.list.length ? chatroom.messages.list[0]['id'] : 0;
      const direction = offset == 0 ? '>' : '<';
      fetchChatroomMessages(chatroom.post_id,offset,direction);
    }

  }


  render() {

    const {onScroll} = this;
    let {currentUser,navigator,chatroom,messageSending} = this.props;

    return (
      <div>
        {messageSending ? <ProgressCircular indeterminate style={{position : "fixed",top : "40%",left :"45%"}} /> : ''}
        {chatroom.messages.loading ? <ProgressCircular indeterminate style={{position : "fixed",top : "50px",left :"45%"}} /> : ''}
        <ul onScroll={onScroll.bind(this)} className="collection" ref="messageList">
         {chatroom.messages.list.map(function(message) {  return (<ChatMessageItem key={message.id} item={message} currentUser={currentUser} navigator={navigator} />) },this)}
        </ul>
      </div>
    );

  }



}


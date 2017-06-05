import React from 'react';
import {ListItem,Row,Col,Button} from 'react-onsenui';
import {generateNavigationKey} from '../utils';
import Chatroom from '../screens/Chatroom';

const JoinedGroupListItem = ({item,navigator,resetUnreadMessages}) => {

  const openChatroom = () => {
    //reduce counter
    resetUnreadMessages(item.post_id);
    navigator.pushPage({component: Chatroom, props : {chatroomId : item.post_id}});
  };

  return (

         <div className="card"  onClick={(e) => openChatroom()}>
          <Row>
            
            <Col verticalAlign="center" width="10%">
              <img style={{ borderRadius : "50%",width:"40px",height:"40px"}} src={item.attachment_url}/>
            </Col>

            <Col style={{padding: "3px 0px 0px 20px"}} width="65%">
              <div style={{whiteSpace:"nowrap",overflow:"hidden",fontWeight:"bold",color:"rgb(21,138,138)",marginBottom:"2px"}}>{item.post_title}</div>
              <div style={{whiteSpace:"nowrap",overflow:"hidden"}}>{item.post_excerpt}</div>
            </Col>
            {
            parseInt(item.unread_messages_count) ?   <Col style={{padding: "10px 0px 10px 0px"}} verticalAlign="center" width="25%">
              <div style={{padding:"5px 10px",marginRight : "10px",fontSize : "13px",float:"right",color:"white",fontWeight:"bold",borderRadius:"50%",background : "rgb(21, 138, 138)"}}>{item.unread_messages_count}</div>
            </Col> : ''
            }
             
          </Row>
          </div>

      )

}; 

export default JoinedGroupListItem;

import React from 'react';
import {ListItem,Row,Col,Button} from 'react-onsenui';
import {generateNavigationKey} from '../utils';
import Chatroom from '../screens/Chatroom';

const ExpertChatListItem = ({item,navigator}) => {

  return (
          <div className="card" onClick={(event) => {navigator.pushPage({component: Chatroom,key : generateNavigationKey(item.post_id),chatroomId : item.post_id}) }}>
          <Row>
            
            <Col verticalAlign="center" width="10%">
              <img style={{ borderRadius : "50%",width:"40px",height:"40px"}} src={item.attachment_url}/>
            </Col>

            <Col style={{padding: "10px 0px 0px 30px"}} width="65%">
              <p style={{whiteSpace:"nowrap",overflow:"hidden",fontWeight:"bold",color:"rgb(21,138,138)",marginBottom:"2px"}}>{item.post_title}</p>
              <p style={{whiteSpace:"nowrap",overflow:"hidden"}}>{item.post_excerpt}</p>
            </Col>
            {
            parseInt(item.unread_messages_count) ?   <Col style={{padding: "10px 0px 10px 0px"}} verticalAlign="center" width="25%">
              <p style={{padding:"4px",marginRight : "10px",fontSize : "12px",float:"right",color:"white",width :"24px",height :"24px",fontWeight:"bold",textAlign:"center",borderRadius:"50%",background:"rgb(132,116,159)"}}>{item.unread_messages_count}</p>
            </Col> : ''
            }
            
          </Row>
        </div>
      )

}; 

export default ExpertChatListItem;

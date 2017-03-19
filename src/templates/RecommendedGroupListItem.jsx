import React from 'react';
import {ListItem,Row,Col,Button} from 'react-onsenui';
import {generateNavigationKey} from '../utils';
import Chatroom from '../screens/Chatroom';


const RecommendedGroupListItem = ({item,navigator,joinChatroom}) => {

    return (
        <ListItem onClick={(event) => { joinChatroom(item.post_id); navigator.pushPage({component: Chatroom,key : generateNavigationKey(item.post_id),chatroomId : item.post_id}); }}>
          <Row>
            
            <Col verticalAlign="center" width="10%">
              <img style={{ borderRadius : "50%",width:"40px",height:"40px"}} src={item.attachment_url}/>
            </Col>

            <Col style={{padding: "10px 0px 0px 30px"}} width="65%">
              <p style={{whiteSpace:"nowrap",overflow:"hidden",fontWeight:"bold",color:"rgb(21,138,138)",marginBottom:"2px"}}>{item.post_title}</p>
              <p style={{whiteSpace:"nowrap",overflow:"hidden"}}>{item.post_excerpt}</p>
            </Col>

            <Col verticalAlign="center" style={{position:"relative",height:"60px",background:"rgb(132,116,159)",color:"white",fontWeight:"bold",textAlign:"center"}} verticalAlign="center" width="25%">
              <p style={{position: "absolute",left: "30%",top: "35%",fontSize: "18px"}}>Join</p>
            </Col>
            
          </Row>
        </ListItem>
        )

}; 

export default RecommendedGroupListItem;

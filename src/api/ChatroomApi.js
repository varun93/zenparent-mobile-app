import fetch from 'isomorphic-fetch';
import cachedFetch from '../utils/cachedFetch';
import {getRequestUrl,prepareFormData} from '../utils';
import {SEND_CHAT_MESSAGE_ENDPOINT,LIST_CHAT_MESSAGES_ENDPOINT,LIST_CHAT_GROUPS_ENDPOINT,GET_GROUP_INFO_ENDPOINT,
JOIN_GROUP_ENDPOINT,LEAVE_GROUP_ENDPOINT,RECORD_CHATROOM_ACTIVITY} from '../constants'

class ChatroomApi {

  static requestHeaders() {
    return {'AUTHORIZATION': `Bearer ${localStorage.jwt}`}
  }

  static listMessages(group_id,message_id,direction) {

    const headers = this.requestHeaders();
    const params = {group_id,message_id,direction};
    const url = getRequestUrl(LIST_CHAT_MESSAGES_ENDPOINT,params);

    const request = new Request(url, {
      method: 'GET',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static listChatrooms() {

    const headers = this.requestHeaders();
    
    const options = {
      method: 'GET',
      headers: headers,
      seconds : 60*60*12
    };
    
    return fetch(LIST_CHAT_GROUPS_ENDPOINT,options).then(r => {
      return r.json()
    }).catch(error => {
      return error
    });
  
  }


  static recordLastChatroomActivity(id){

    const headers = this.requestHeaders();

    const request = new Request(RECORD_CHATROOM_ACTIVITY, {
      method: 'POST',
      headers: headers,
      body: prepareFormData({group_id : id})
    });


    return fetch(request).then(response => {
      console.log(response);
      return response.json()
    }).catch(error => {
      return error
    });

  }


  static joinChatroom(id) {
   
    const headers = this.requestHeaders();

    const request = new Request(JOIN_GROUP_ENDPOINT, {
      method: 'POST',
      headers : headers,
      body : prepareFormData({group_id : id})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }


  static leaveChatroom(id) {
    const headers = this.requestHeaders();
    const request = new Request(LEAVE_GROUP_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body : prepareFormData({group_id : id})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static sendMessage(message,payload_type='text',group_id) {
    const headers = this.requestHeaders();
    const request = new Request(SEND_CHAT_MESSAGE_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body : prepareFormData({message,payload_type,group_id}) 
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default ChatroomApi
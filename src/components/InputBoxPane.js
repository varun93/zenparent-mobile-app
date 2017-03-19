import React,{Component} from 'react';
import {Row,Col} from 'react-onsenui';


const styles = {
  chatFooterWrapper : {
    display :  "table",
    width  : "100%"
  },
  messageBox : {
    display : "table-cell",
    width : "80%"
  },
  sendButton : {
    display : "table-cell",
    width : "20%",
    verticalAlign : "middle",
    textAlign : "center"
  }


}

export default class InputBoxPane extends Component{

  constructor(props,context){
    super(props,context);

    this.state = {
      message : 'Enter your Message Here'
    };

  }


  componentWillReceiveProps(nextProps){
    
    if(this.props.messageSent == false && nextProps.messageSent == true){
      this.setState({message : ''});
    }

  }

  _sendMessage(){
    let message = this.state.message;
    if (message === "") return;
    this.props.sendMessage(message,'text',this.props.chatroomId);
  }


  _onChange(e){
    let message = e.target.value;
    this.setState({message : message});
  }
  
  _onClick(e){
    this._sendMessage.call(this);
  }

   _onEnter(e){
    if (e.nativeEvent.keyCode != 13) return;
    e.preventDefault();
    this._sendMessage.call(this);
   };

  render(){

    return (
        <div id="chatroom-footer" className="input-box-pane">
          <div style={styles.chatFooterWrapper}>
            <div style={styles.messageBox}>
             <textarea value={this.state.message} onChange={this._onChange.bind(this)} onKeyPress={this._onEnter.bind(this)}></textarea>
            </div>

            <div style={styles.sendButton} onClick={this._onClick.bind(this)} className="msg-send-btn">
              <span><ons-icon icon="fa-paper-plane"></ons-icon></span>
            </div>
       
          </div>
        </div>
      )
  }
	
}


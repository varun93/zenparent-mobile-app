import React,{Component} from 'react';
import {Row,Col} from 'react-onsenui';
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
          <Row>
            <Col style={{height : "45px",marginRight : "5px"}} verticalAlign="center" width="84%">
             <textarea value={this.state.message} onChange={this._onChange.bind(this)} onKeyPress={this._onEnter.bind(this)}></textarea>
            </Col>

            <Col onClick={this._onClick.bind(this)} className="msg-send-btn" verticalAlign="center" width="14%">
              <span><ons-icon icon="fa-paper-plane"></ons-icon></span>
            </Col>
       
          </Row>
        </div>
      )
  }
	
}


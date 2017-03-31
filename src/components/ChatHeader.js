import React,{Component} from 'react';
import {Toolbar,BackButton,Button} from 'react-onsenui';
import Community from '../screens/Community';
import classNames from 'classnames';

const styles = {

	container : {
		position : "fixed",
		top : "9%",
		right :"0px",
		minWidth : "160px",
		textAlign : "center",
		background : "white",
		color : "black",
		height : "20px",
		padding : "8px"
	},
	item : {
		color: "#009fa0",
    	textAlign: "left"
	}

};


const DropDownMenu = ({chatroomId,leaveChatroom,navigator,visible}) => {

	const onClick = () => {
		leaveChatroom(chatroomId); 
		navigator.popPage();
	}; 

	const className = classNames({'hide' : !visible});
	
	return (
		<div onClick={() => onClick()} className={className} style={styles.container}>
			<p style={styles.item}>Leave Group</p>
		</div>	
	);

};


export default class ChatHeader extends Component {

	constructor(props,context){
		super(props,context);
		this.state = {
			visible : false
		};
	}

	componentDidMount(){

		document.querySelector(".collection").addEventListener('click',function() {
			if(this.state.visible){
				this.setState({visible : false});
			}
		}.bind(this));
	
	}

	toggleMenu(){
		const visible = !this.state.visible;
		this.setState({visible});
	}

	render(){
		const {chatroomId,title,leaveChatroom,navigator} = this.props;
		return (
		<Toolbar>
	        <div style={{width:"10%"}} className="left">
	            <BackButton onClick={() => navigator.popPage() }></BackButton>
	          </div>
			 <div style={{width:"80%"}} className="center">
	           {title}
	          </div>
	          <div onClick={this.toggleMenu.bind(this)} style={{width:"10%",textAlign:"center"}} className="right">
	        	<ons-icon size="24px" icon="ion-android-more-vertical"></ons-icon>
	        </div>
	    	<DropDownMenu leaveChatroom={leaveChatroom} navigator={navigator}  chatroomId={chatroomId}  visible={this.state.visible}/>
	    </Toolbar>
	)

	}
	
}

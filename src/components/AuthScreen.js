import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page,Button,ProgressCircular} from 'react-onsenui';
import Toolbar from '../templates/Toolbar';
//the screens
import {validateEmail,generateNavigationKey} from '../utils';
import MainScreen from '../screens/MainScreen';
import CustomInput from './CustomInput';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import UserInterestsSelector from '../screens/UserInterestsSelector';

// css imports
require('../styles/auth.css');


export default class AuthScreen extends Component{

	constructor(props,context){
		
		super(props,context);
		
		this.state = {
			userEmail : '',
			counter : 0
		};
	}

	_checkUserStatus(){
		let userEmail = this.state.userEmail;
		
		if(validateEmail(this.state.userEmail)){
      		this.props.checkUserStatus(userEmail);
    	}
		else{
			return;
		}
	}

	handleEmailChange(e){
    	this.setState({userEmail : e.target.value});
  	}


	_onClick(e){
		this._checkUserStatus.call(this);
	}

	_onEnter(e){
		this._checkUserStatus.call(this);
	}

	handleFacebookLogin(){
		console.log("Logic of Google login goes here!");
	}

	handleGoogleLogin(){
		console.log("Logic of Facebook login goes here!");
	}


	componentWillReceiveProps(nextProps) {

		let status = nextProps.status;
		let component = SignupScreen;
		let allowedStatus = ['registered','new-user'];
		let key = 'signup-screen';
		let props = {};
		
		
		if(allowedStatus.indexOf(status) === -1 || this.props.authenticated || (this.props.status == status) ||  status == 'anonymous'){
			return;
		}

		if(status == 'registered'){
			let authenticated = nextProps.authenticated;
			
			if(authenticated){
				
				let userInfo = nextProps.userInfo;
				let date = userInfo.date.trim();
				let stageOfParenting = userInfo.stageOfParenting.trim();
				let interests = userInfo.interests;
				let profileComplete  = date.length && stageOfParenting.length && interests.length; 
				
				if(profileComplete){
					component = MainScreen;
					key = 'main-screen';
				}
				else{
					if(!date.length || !stageOfParenting.length){
						component = LoginScreen;
						key = 'login-screen';
					}
					else if(!interests.length){
						component = UserInterestsSelector;
						key = 'user-interests-selector-screen';
					}
				}

			}

			else{
				component = LoginScreen;
				key = 'login-screen';
				props['showPasswordField'] = true;
			}
		
		}
		
		key = generateNavigationKey(key);
		props['key'] = key;
		let route = Object.assign({},{component},{props});
		nextProps.navigator.pushPage(route);


	}


	render(){

		const loading = this.props.loading;

		return(
			  <Page className="signupPage">
					<div id="footer">
			          <div style={{textAlign: 'center'}}>
			             <CustomInput
				             type='text'
				             disabled = {false}
				             value={this.state.userEmail}
				             validate = {validateEmail}
				             onChange = {this.handleEmailChange.bind(this)}
				             placeholder = "Email Address"
				             emptyMessage="Email is required"
				             errorMessage="Email is invalid"
          				 />
			            
			            <p>
			              <button className={`loginBtn emailBtn ${loading ? 'loading' : ''} `} onClick={this._onClick.bind(this)}>
			                 {loading ? <ProgressCircular indeterminate/> :  `Continue with Email` } 
			              </button>
			            </p>
			            
			          </div>

			            <div style={{position:"relative",height:"30px"}}>
			              
			              <div style={{width:"100%",height:"1px",background:"rgb(176,176,176)",position:"absolute",top:"14px"}} >
			              </div>
			                
			              <div style={{position:"absolute",top:"2px",left:"45%",background: "rgb(238,238,238)"}}>
			               <span style={{color:"rgb(103,103,103)",fontWeight:"bold",padding:"15px"}}>OR</span>
			              </div>

			            </div>

			            <div>
			                <button onClick={this.handleFacebookLogin.bind(this)} className="loginBtn--facebook loginBtn" style={{marginBottom:"5px"}}>
			                  <span className="text-box">Continue with Facebook</span>
			                </button>
			                
			                <button onClick={this.handleGoogleLogin.bind(this)} className="loginBtn--google loginBtn">
			                  <span className="text-box">Continue with Google</span>
			                </button>
			            </div>
			          </div>
			      </Page>

			)
	}

}

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page,Button,ProgressCircular} from 'react-onsenui';
import Toolbar from '../templates/Toolbar';
//the screens
import {validateEmail} from '../utils';
import getNextRoute from '../utils/getNextRoute';
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

	componentWillReceiveProps(nextProps) {

		let component = null;
		let user = nextProps.user;
		let allowedStatus = ['registered','new-user','token-signin-success'];
		let status = user.status;
		
		if(allowedStatus.indexOf(status) === -1 || this.props.user.authenticated ||  status == 'anonymous' || (this.props.user.status == status)){
			return;
		}

		let route = getNextRoute(user);
		nextProps.navigator.pushPage(route);
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

	handleGoogleLogin(){
    
       var classContext = this;
    
       window.plugins.googleplus.login(
          {
            'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': '579056634272-j8efs6o3lp2es38ls420hg7movtuccqm.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
          },
          function (obj) {

             var userEmail = obj.email;
             var userID = obj.userId;
             var displayName = obj.displayName;
             var imageUrl = obj.imageUrl;
             var token = obj.idToken;
             var loginBy = 'google';
     
             if(userEmail){
                classContext.props.tokenSignin(token,userID,userEmail,displayName,imageUrl,loginBy); 
             }
         
          },
          function (msg) {
            alert('error: ' + msg);
          }
      );

  }
  
  handleFacebookLogin(){
   	
   	var classContext = this;

    var fbLoginSuccess = function (userData)
    {

      var accessToken = userData.authResponse.accessToken;
      var userID = userData.authResponse.userID;
   
      facebookConnectPlugin.api("me/?fields=id,name,email,picture", ["email","public_profile"],
        function onSuccess (result) {

            var userID = result.id;
            var userEmail = result.email;
            var imageUrl = result.picture.data.url;
            var displayName = result.name;
            var loginBy = 'facebook';
          
            if(userEmail){
                 classContext.props.tokenSignin(accessToken,userID,userEmail,displayName,imageUrl,loginBy); 
            }
            

        }, function onError (error) {
          console.error("Failed: ", error);
        }
    );
  }

    facebookConnectPlugin.login(["public_profile"],
        fbLoginSuccess,
         function (error) { alert("" + error) }
         );

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

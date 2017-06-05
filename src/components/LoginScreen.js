import React,{Component} from 'react';
import {Page,Input,ProgressCircular,Icon} from 'react-onsenui';
import {v4} from 'node-uuid';
import Toolbar from '../templates/Toolbar';
import CustomInput from './CustomInput';
import {isFieldEmpty,generateNavigationKey} from '../utils';
import getNextRoute from '../utils/getNextRoute';
import UserInterestsSelector from '../screens/UserInterestsSelector';
import MainScreen from '../screens/MainScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import {BlogAnalytics} from '../utils/Analytics';
import {SCREEN_VIEWED} from '../constants';


const styles = {

	errorDiv : {
		top : '0%',
   	 	position: 'relative',
    	width: '90%',
    }
};

export default class LoginScreen extends Component{

	constructor(props,context){
	
		super(props,context);

		this.state = {
			userPassword: ''	
	    };

	}

	componentDidMount(){
		// record screen viewed event
		try {
		  	BlogAnalytics(SCREEN_VIEWED,null,'LoginScreen'); // generates an exception
		}
		catch (e) {
		   	// statements to handle any exceptions
		  console.log(e); // pass exception object to error handler
		}	
	}

	handlePasswordChange(e){
		let userPassword = e.target.value;
    	this.setState({userPassword});
	}

	validatePassword(value){
    	return !isFieldEmpty(value);
    } 

	_onClick(e){

		const {user,navigator} = this.props;
		let userEmail = user.userInfo.user_email;
		let {userPassword} = this.state;
		
		if(this.validatePassword(userPassword)){
      		this.props.login(userEmail,userPassword,navigator);
    	}
		else{
			return;
		}
		
	}


	render(){
		
		const {user} = this.props;
		const userEmail = user.userInfo ? user.userInfo.user_email : '';
		const error = user.error || '';
		const loading = user.loading;

		return (
			<Page key="login-screen" className="login-screen">
				
				<div className="login-container">

					{
					error ? 
					<div style={styles.errorDiv} className="alert alert-danger">
						Incorrect Username or Password
					</div> : ''
					}

					<p style={{fontWeight:"500",fontSize:"16px",color:"rgb(132,116,159)",textAlign:"center"}}>
						You are already a member!
					</p>
					
					<p>
						<Input
						    disabled={true}
						    type="text"
							value={userEmail}  
						/>
					</p>

		           	<CustomInput
		             type="password"
		             validate = {this.validatePassword}
		             onChange = {this.handlePasswordChange.bind(this)}
		             disabled = {false}
		             placeholder = "Password"
		             emptyMessage="Password is required"
		             errorMessage="Password is required"
		          />

            		<p onClick={() => this.props.navigator.pushPage({component : ForgotPasswordScreen,props : {key : v4()} })} style={{color:"rgb(132,116,159)",float : "right",fontSize:"12px",fontWeight:"500"}}>
						Forgot Password?
					</p>

					<button onClick={this._onClick.bind(this)}>
			            {loading ? <Icon style={{color: 'white'}} size={28} spin icon='md-spinner'/> :  `Login` } 
			        </button>

				</div>

			</Page>
		);
	}
}

// ion-load-c
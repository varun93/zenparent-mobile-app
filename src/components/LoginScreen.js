import React,{Component} from 'react';
import {Page,Input,ProgressCircular} from 'react-onsenui';
import Toolbar from '../templates/Toolbar';
import CustomInput from './CustomInput';
import {isFieldEmpty,generateNavigationKey} from '../utils';
import getNextRoute from '../utils/getNextRoute';
import UserInterestsSelector from '../screens/UserInterestsSelector';
import MainScreen from '../screens/MainScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

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

	handlePasswordChange(e){
		let userPassword = e.target.value;
    	this.setState({userPassword});
	}

	validatePassword(value){
    	return !isFieldEmpty(value);
    } 

	_onClick(e){

		let userEmail = this.props.user.userInfo.user_email;
		let userPassword = this.state.userPassword;
		
		if(this.validatePassword(userPassword)){
      		this.props.login(userEmail,userPassword);
    	}
		else{
			return;
		}
		
	}


	componentWillReceiveProps(nextProps) {

		const user = nextProps.user;
		const status = user.status;
		const authenticated = user.authenticated;
		const allowedStatus = ['login-success'];

		if(!authenticated || allowedStatus.indexOf(status) === -1  || this.props.user.status == status){
			return;
		}

		let route = getNextRoute(user);
		nextProps.navigator.pushPage(route);

	}

	render(){
		
		const {user} = this.props;
		const userEmail = user.userInfo.user_email || '';
		const error = user.error || '';
		const loading = user.loading;

		return (
			<Page key="login-screen" className="login-screen">
				<Toolbar navigator={this.props.navigator} /> 

				<div className="login-container">

					{
					error.trim().length ? 
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

            		<p onClick={() => this.props.navigator.pushPage({component : ForgotPasswordScreen,key : generateNavigationKey('forgot-password') })} style={{color:"rgb(132,116,159)",float : "right",fontSize:"12px",fontWeight:"500"}}>
						Forgot Password?
					</p>

					<button onClick={this._onClick.bind(this)}>
			            {loading ? <ProgressCircular className="loading" indeterminate/> :  `Login` } 
			        </button>

				</div>

			</Page>
		);
	}
}
import React,{Component} from 'react';
import {Page,Input} from 'react-onsenui';
import Toolbar from '../templates/Toolbar';
import CustomInput from './CustomInput';
import {isFieldEmpty,validateEmail} from '../utils';

const styles = {

	errorDiv : {
		top : '0p%',
   	 	position: 'relative',
    	width: '100%',
    }
};



export default class ForgotPasswordScreen extends Component{

	constructor(props,context){
	
		super(props,context);

	}

	componentWillReceiveProps(nextProps){
		const userEmail = nextProps.user.userInfo.user_email || '';
		this.setState({userEmail})
	}

	handleEmailChange(e){
		let userPassword = e.target.value;
    	this.setState({userPassword});
	}


	_onClick(e){

		let userEmail = this.props.user.userInfo.user_email;
		this.props.forgotPassword(userEmail);
    	
	}


	render(){
			
		const {user} = this.props;
		const userEmail = user.userInfo.user_email || '';
		const loading = user.loading;
		const forgotPassword = user.forgotPassword;

		return (
				
				<div className="forgot-password-container">
					
				   <div style={styles.errorDiv}>
					{forgotPassword.message ? 
						forgotPassword.status ? 
						<div className='alert alert-danger'>
							{forgotPassword.message}
						</div> :
						<div className='alert alert-success'>
							{forgotPassword.message}
						</div>
						 : 
						''
					}
					</div>
					<p>
						<Input
						    disabled={true}
						    type="text"
							value={userEmail}  
						/>
					</p>

		           	<button onClick={this._onClick.bind(this)}>
					  Submit
					</button>
				</div>

		);
	}
}
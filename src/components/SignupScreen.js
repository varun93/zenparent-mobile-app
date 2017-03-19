import React,{Component} from 'react';
import {Page,Input,ProgressCircular} from 'react-onsenui';
import CustomInput from './CustomInput';
import {isFieldEmpty} from '../utils';
import Toolbar from '../templates/Toolbar';
import UserInterestsSelector from '../screens/UserInterestsSelector';
import {generateNavigationKey} from '../utils';

export default class SignupScreen extends Component{

	constructor(props,context){
	
		super(props,context);

		this.state = {
      		userPassword: '',
      		date : ''
	    };

	}
	
	componentWillReceiveProps(nextProps) {

		const user = nextProps.user;
		const authenticated = user.authenticated;
		const status = nextProps.user.status;
		const allowedStatus = ['signup-success'];

		if(!authenticated || allowedStatus.indexOf(status) === -1 || nextProps.user.status == this.props.user.status){
			return;
		}
		
		let component = UserInterestsSelector;
		let props = {};
		let navigationKey = generateNavigationKey(`user-interests-selector-screen${user.userInfo['id']}`);
		props['key'] = navigationKey;
		let route = Object.assign({},{component},{props});
		nextProps.navigator.pushPage(route);
	}

	_handlePasswordChange(e){
		let userPassword = e.target.value;
    	this.setState({userPassword});
	}

	_handleDateChange(e){
		let date = e.target.value;
		this.setState({date});
	}

	validatePassword(value){
    	return !isFieldEmpty(value);
    }

    _onClick(e){

		let userEmail = this.props.user.userInfo.user_email;
		let userPassword = this.state.userPassword;
		let date = this.state.date || '';
		
		if(this.validatePassword(userPassword) && !isFieldEmpty(date)){
      		this.props.signup(userEmail,userPassword,date);
    	}
		else{
			return;
		}
		
	}


	render(){

		let {user,navigator} = this.props;
		let {userPassword,date} = this.state;
		const userEmail = this.props.user.userInfo.user_email || '';
		const loading = this.props.user.loading;

		return (
			<Page key="signup-screen" className="signup-screen">
				<Toolbar navigator={navigator} />
				<div className="signup-container">

					<p>
		              <Input
		                disabled
		                value={userEmail}
		                placeholder='Email' />
            		</p>

					<CustomInput
			             type="password"
			             validate = {this.validatePassword}
			             onChange = {this._handlePasswordChange.bind(this)}
			             disabled = {false}
			             placeholder = "Password"
			             emptyMessage="Password is required"
			             errorMessage="Password is required"
			          />


            		<span style={{color:"#8675A1",fontSize:"13px"}}>Due Date/Your Child's Birthday</span>
		            <CustomInput
			             type="date"
			             onChange = {this._handleDateChange.bind(this)}
			             disabled = {false}
			             emptyMessage="Date required"
			             errorMessage="Date required"
		          	/>

			        <button className={`loginBtn emailBtn ${loading ? 'loading' : ''} `} onClick={this._onClick.bind(this)}>
			            {loading ? <ProgressCircular indeterminate/> :  `Signup` } 
			        </button>
	
				</div>

			</Page>
		);

	}
}
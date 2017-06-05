import React,{Component} from 'react';
import {Page,Input,ProgressCircular,Icon} from 'react-onsenui';
import CustomInput from './CustomInput';
import LanguageSelect from  '../templates/LanguageSelect';
import {isFieldEmpty,validateDate} from '../utils';
import Toolbar from '../templates/Toolbar';
import UserInterestsSelector from '../screens/UserInterestsSelector';
import getNextRoute from '../utils/getNextRoute';
import {BlogAnalytics} from '../utils/Analytics';
import {SCREEN_VIEWED} from '../constants';

export default class SignupScreen extends Component{

	constructor(props,context){
	
		super(props,context);

		this.state = {
      		userPassword: '',
      		date : '',
      		languagePreference : 'English'
	    };

	}

	componentDidMount(){
		// record screen viewed event
		try {
		  	BlogAnalytics(SCREEN_VIEWED,null,'SignupScreen'); // generates an exception
		}
		catch (e) {
		   	// statements to handle any exceptions
		  console.log(e); // pass exception object to error handler
		}	
	}
	

	_handlePasswordChange(e){
		const userPassword = e.target.value;
    	this.setState({userPassword});
	}

	_handleDateChange(e){
		const date = e.target.value;
		this.setState({date});
	}

	_onLanguageChange(e){
		const languagePreference = e.target.value;
		this.setState({languagePreference});
	}

	validatePassword(value){
    	return !isFieldEmpty(value);
    }

    _onClick(e){

		const userEmail = this.props.user.userInfo.user_email;
		const {date,userPassword,languagePreference} = this.state;
		const {navigator} = this.props;
	
		if(this.validatePassword(userPassword) && validateDate(date)){
      		this.props.signup(userEmail,userPassword,date,languagePreference,navigator);
    	}
		else{
			return;
		}
		
	}


	render(){

		let {user,navigator} = this.props;
		let {userPassword,date,languagePreference} = this.state;
		const userInfo = user.userInfo;
		const userEmail = userInfo ? userInfo.user_email : '';
		const loading = user.loading;

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
			             type = "date"
			             onChange = {this._handleDateChange.bind(this)}
			             disabled = {false}
			             validate = {validateDate}
			             emptyMessage="Date is Invalid"
			             errorMessage="Date is Invalid"
		          	/>

		          	<span style={{color:"#8675A1",fontSize:"13px"}}>Language Preference</span>
		          	<LanguageSelect languagePreference={languagePreference} onLanguageChange={this._onLanguageChange.bind(this)} />


			        <button className={`loginBtn emailBtn`} onClick={this._onClick.bind(this)}>
			            {loading ? <Icon style={{color: 'white'}} size={28} spin icon='md-spinner'/> :  `Signup` } 
			        </button>
	
				</div>

			</Page>
		);

	}
}
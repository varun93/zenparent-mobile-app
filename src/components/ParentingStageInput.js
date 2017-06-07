import React,{Component} from 'react';
import {Page,Input,ProgressCircular,Icon} from 'react-onsenui';
import LanguageSelect from  '../templates/LanguageSelect';
import Toolbar from '../templates/Toolbar';
import CustomInput from './CustomInput';
import {isFieldEmpty,validateDate} from '../utils';
import getNextRoute from '../utils/getNextRoute';
import {BlogAnalytics} from '../utils/Analytics';
import {SCREEN_VIEWED} from '../constants';


export default class ParentingStageInput extends Component {

	constructor(props,context){
	
		super(props,context);

		this.state = {
			date: '',
			languagePreference : 'English'	
	    };

	}


	componentDidMount(){
		// record screen viewed event
		try {
		  	BlogAnalytics(SCREEN_VIEWED,null,'ParentingStageInputScreen'); // generates an exception
		}
		catch (e) {
		   	// statements to handle any exceptions
		  console.log(e); // pass exception object to error handler
		}	
	}
	
		
	_handleDateChange(e){
		const date = e.target.value;
		this.setState({date});
	}

	_onLanguageChange(e){
		const languagePreference = e.target.value;
		this.setState({languagePreference});
  	}

	_onClick(e){

		const {date,languagePreference} = this.state;
		const {navigator} = this.props;

		if(isFieldEmpty(date) || isFieldEmpty(languagePreference)){
			return;
    	}
	
		this.props.updateUserProfile(date,'','',languagePreference,navigator);		
	}


	render(){
		
		const {user} = this.props;
		const error = user.error || '';
		const loading = user.loading;
		const {languagePreference} = this.state;

		return (
			<Page key="parenting-stage-input-screen" className="parenting-stage-input-screen">
				<Toolbar navigator={this.props.navigator} />
				<div className="parenting-stage-input-container">

					<span style={{color:"#8675A1",fontSize:"13px"}}>Due Date/Your Child's Birthday</span>
		            <CustomInput
			             type = "date"
			             onChange = {this._handleDateChange.bind(this)}
			             disabled = {false}
			             validate = {validateDate}
			             emptyMessage = "Date is invalid"
			             errorMessage = "Date is invalid"
		          	/>

		          	<span style={{color:"#8675A1",fontSize:"13px"}}>Language Preference</span>
		          	<LanguageSelect languagePreference={languagePreference} onLanguageChange={this._onLanguageChange.bind(this)} />

		        
			        <button className={`loginBtn emailBtn`} onClick={this._onClick.bind(this)}>
			            {loading ? <Icon style={{color: 'white'}} size={28} spin icon='md-spinner'/> :  `Continue` } 
			        </button>
	
				</div>

			</Page>
		);
	}
}
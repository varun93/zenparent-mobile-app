import React,{Component} from 'react';
import {Page,Input,ProgressCircular} from 'react-onsenui';
import Toolbar from '../templates/Toolbar';
import CustomInput from './CustomInput';
import {isFieldEmpty,generateNavigationKey,validateDate} from '../utils';
import getNextRoute from '../utils/getNextRoute';

export default class ParentingStageInput extends Component{

	constructor(props,context){
	
		super(props,context);

		this.state = {
			date: ''	
	    };

	}

	_handleDateChange(e){
		let date = e.target.value;
		this.setState({date});
	}

	_onClick(e){

		let date = this.state.date || '';
		
		if(!isFieldEmpty(date)){
      		this.props.updateUserProfile(date,'','');
    	}
		else{
			return;
		}
		
	}

	//get Next Route
	componentWillReceiveProps(nextProps) {

		const user = nextProps.user;
		const authenticated = user.authenticated;
		const allowedStatus = ['user-profile-updated'];

		if(!authenticated || this.props.user.status == nextProps.user.status){
			return;
		}
		if(this.props.user.userInfo.stage_of_parenting && this.props.user.userInfo.stage_of_parenting.length > 0){
			return;
		}

		let route = getNextRoute(user);
		nextProps.navigator.pushPage(route);
	}

	render(){
		
		const {user} = this.props;
		const error = user.error || '';
		const loading = user.loading;

		return (
			<Page key="parenting-stage-input-screen" className="parenting-stage-input-screen">
				<Toolbar navigator={this.props.navigator} />
				<div className="parenting-stage-input-container">

					<span style={{color:"#8675A1",fontSize:"13px"}}>Due Date/Your Child's Birthday</span>
		            <CustomInput
			             type="date"
			             onChange = {this._handleDateChange.bind(this)}
			             disabled = {false}
			             validate = {validateDate}
			             emptyMessage="Date is invalid"
			             errorMessage="Date is invalid"
		          	/>

			        <button className={`loginBtn emailBtn `} onClick={this._onClick.bind(this)}>
			            {loading ? <ProgressCircular className="loading" indeterminate/> :  `Continue` } 
			        </button>
	
				</div>

			</Page>
		);
	}
}
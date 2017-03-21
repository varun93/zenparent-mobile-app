import React,{Component} from 'react';
import {Page,Input,ProgressCircular} from 'react-onsenui';
import CustomInput from './CustomInput';
import {isFieldEmpty,generateNavigationKey} from '../utils';
import {getNextRoute} from '../utils/getNextRoute';

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
      		this.props.updateParentingStage(date);
    	}
		else{
			return;
		}
		
	}

	//get Next Route
	componentWillReceiveProps(nextProps) {

		const user = nextProps.user;
		const authenticated = user.authenticated;
		const allowedStatus = ['parenting-stage-updated'];

		if(!authenticated || this.props.user.status == nextProps.user.status){
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
				<Toolbar navigator={navigator} />
				<div className="parenting-stage-input-container">

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
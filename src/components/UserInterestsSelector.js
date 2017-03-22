import React,{Component} from 'react';
import {Page,Dialog,Button,BottomToolbar} from 'react-onsenui';
import {ucFirstLetter} from '../utils';
import MainScreen from '../screens/MainScreen';
import {generateNavigationKey} from '../utils';
import {platform} from 'onsenui';
require('../styles/interests.css');

export default class UserInterestsSelector extends Component {

	constructor(props,context){
		super(props,context);
		this.state = {
			dialogShown : false
		}
	}

	componentWillMount(){
		this.props.fetchInterests();
	}

	hideDialog() {
    	this.setState({dialogShown: false});
  	}


	componentWillReceiveProps(nextProps){

		if(this.props.updateStatus == nextProps.updateStatus){
			return;
		}

		if(nextProps.updateStatus == 'interests-updated'){
			let component = MainScreen;
			let navigationKey = generateNavigationKey('main-screen-reset');
			nextProps.navigator.pushPage({component : MainScreen,key : navigationKey});
		}
	}

	_submitTags(){	

		let userInterests = this.props.interests.terms.filter(function(interest){
			return interest.isSelected == true; 
		}).map(function(interest){
			return interest.term;
		});

		if(userInterests.length > 2){
			this.props.updateUserInterests(userInterests);
		}
		else{
			this.setState({dialogShown: true});
		}
	}
		
	_toggleInterest(term){
		this.props.toggleInterest(term);
	}

	renderInterest(interest){

		return (
			<div key={interest.term} onClick={this._toggleInterest.bind(this,interest.term)} className={interest.isSelected ? 'interestTag tagSelected' : 'interestTag' }>{interest.label}</div>
		)

	}

	render(){
		
		return (
		   <Page key="userInterestsSelector" className="interestsSelector">
		   	<Dialog
          		isOpen={this.state.dialogShown}
          		isCancelable={true}
          		onCancel={this.hideDialog}>
          	  <div style={{textAlign: 'center', margin: '20px'}}>
	            <p style={{opacity: 0.5,color:'red'}}>Please select atleast three interests</p>
	            <p>
	              <Button onClick={this.hideDialog.bind(this)}>Close</Button>
	            </p>
	          </div>
        	</Dialog>

		   	 <div className="message" style={{fontWeight : "bold",textAlign : "center"}}> 
		   	 	Help us personalize your feed!
		   	 </div>
			 <div style={{overflowY : "scroll",height : "100vh"}} className="selectionPanel">
			 { this.props.interests.terms.map(function(interest){
			 		return this.renderInterest.call(this,interest)
			 },this)}
			 </div>
			 <div className="continueButton">
			 	<button onClick={this._submitTags.bind(this)}>Continue</button>
			 </div>
		   </Page>
		)
	}

}

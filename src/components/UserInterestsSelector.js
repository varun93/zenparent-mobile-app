import React,{Component} from 'react';
import ScreenLoader from '../templates/ScreenLoader';
import {Page,Dialog,Button,ProgressCircular,BottomToolbar,Icon} from 'react-onsenui';
import {ucFirstLetter} from '../utils';
import {v4} from 'node-uuid';
import MainScreen from '../screens/MainScreen';
import {platform} from 'onsenui';
import {BlogAnalytics} from '../utils/Analytics';
import {SCREEN_VIEWED} from '../constants';


require('../styles/interests.css');

export default class UserInterestsSelector extends Component {

	constructor(props,context){
		super(props,context);
		this.state = {
			dialogShown : false
		}
	}

	componentDidMount(){

		this.props.userAuthenticated && this.props.fetchInterests();

		// record screen viewed event
		try {
	  	 BlogAnalytics(SCREEN_VIEWED,null,'UserInterestsSelectorScreen'); // generates an exception
		}
		catch (e) {
	   	// statements to handle any exceptions
	   	console.log(e); // pass exception object to error handler
		}
		
	}

	hideDialog() {
    	this.setState({dialogShown: false});
  	}


	componentWillReceiveProps(nextProps){

		if((!this.props.userAuthenticated && nextProps.userAuthenticated) || nextProps.interests.error){
			this.props.fetchInterests();
		}

	}

	_submitTags(){	

		let userInterests = this.props.interests.terms.filter(function(interest){
			return interest.isSelected == true; 
		}).map(function(interest){
			return interest.term;
		});

		if(userInterests.length > 2){
			//submit the posts
			this.props.updateUserInterests(userInterests,this.props.navigator);
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
			<div key={v4()} onClick={this._toggleInterest.bind(this,interest.term)} className={interest.isSelected ? 'interestTag tagSelected' : 'interestTag' }>{interest.label}</div>
		)

	}

	render(){
		
		const {interests,loading} = this.props;
		const terms = interests.terms === undefined ? [] : interests.terms;

		return (
		   <Page key="userInterestsSelector" className="interestsSelector">
		   	<Dialog
          		isOpen={this.state.dialogShown}
          		isCancelable={true}
          		onCancel={this.hideDialog.bind(this)}>
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
			 
			 {interests.loading  ?  
				<ScreenLoader />
			 	:
			 <div style={{overflowY : "scroll",height : "100vh"}} className="selectionPanel">
			 {terms.map(function(interest){
			 		return this.renderInterest.call(this,interest)
			 },this)}
			 </div>}
			 
			 <div className="continueButton">
			 	<button onClick={this._submitTags.bind(this)}>
			 	  {loading ? <Icon style={{color: 'white'}} size={28} spin icon='md-spinner'/> :  `Continue` } 
			 	</button>
			 </div>
		   </Page>
		)
	}

}

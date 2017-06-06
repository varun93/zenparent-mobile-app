import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Icon,Button} from 'react-onsenui';
import classNames from 'classnames';
import {LANGUAGE_TOGGLED} from '../constants';
import {UserAnalytics} from '../utils/Analytics';
import LanguageSwitch from '../templates/LanguageSwitch';
import {updateUserProfile} from '../actions/userActions';
import {isFieldEmpty} from '../utils';

const styles = {
	
	wrapper : {
		width : "100%",
		display : "table",
		color : "white",
		background : "rgb(132,116,159)",
		top : "0px",
		zIndex : "1000"

	},
	container : {
	  width : "40%",
	  verticalAlign : "middle",
	  display : "table-cell",
	  padding : "10px"
	},
	languageSwitch : {
		width : "60%",
		fontSize : "16px",
		textAlign : "right",
	  	verticalAlign : "middle",
		margin : "5px 0px !important",
		display : "table-cell"	
	},
	divider : {
		color : "white"
	},
	languageButton : {
		color : "white"
	}
};

class MenuBar extends Component {

	constructor(props,context){
		
		super(props,context);
		
		this.state = {
			languagePreference : ''
		}
		
		this.progressInfo.bind(this);
		this._onChange.bind(this);

	}


	componentDidMount(){

		let user = null;

		try{
			user = window.localStorage.state;
			user = JSON.parse(user);
		}
		catch(e){
			//
		}

		const languagePreference = user ?  (user.authenticated ? user.userInfo.language_preference : "English") : "English";
		this.setState({languagePreference});	
		
	}

	componentWillReceiveProps(nextProps) {
	
		const currentUser = this.props.user;
		const nextUser = nextProps.user;

		if(!nextUser.authenticated){
			return;
		}		

		const currentUserLanguage = currentUser.userInfo ? currentUser.userInfo.language_preference : "English"; 
		const nextUserLanguage  = nextUser.userInfo.language_preference;

		if(currentUserLanguage  !== nextUserLanguage){
			this.setState({languagePreference : nextUserLanguage});										
		}

	}

	progressInfo() {

		const {user} = this.props;


		if(isFieldEmpty(user) || !user.authenticated){
			return '';
		}

		const userInfo = user.userInfo;

		const stageOfParenting = userInfo.stage_of_parenting;
		let progressInfo = '';

		if(stageOfParenting == 'parent'){

			const months = userInfo.kids_age_in_months;
			const years = Math.floor(months/12);
			const weeks = userInfo.kids_age_in_weeks;

			if(months == 0){
				progressInfo = `Week ${weeks}`;
			}
			else if(months < 24){
				progressInfo = `Month ${months}`;
			}
			else{
				progressInfo = `Year ${years}`;
			}
			
		}
		if(stageOfParenting == 'pregnant'){
			progressInfo = `Week ${userInfo.week_number}`;
		}

		return progressInfo;
	};

	_onChange(e){
		const {user} = this.props;

		if(user.loading){
			return;
		}

		let languagePreference = this.state.languagePreference;
		languagePreference = (languagePreference == "English") ? "Hindi" : "English";

		// record the toggle 
		try {
		    UserAnalytics(LANGUAGE_TOGGLED); 		
		}
		catch(e) {
		   console.log(e); 
		}

		this.setState({languagePreference});
		this.props.updateUserProfile('','','',languagePreference);		
	}


	render(){

		const progressInfo = this.progressInfo();
		const {user} = this.props;
		let {languagePreference} = this.state;


		return (
			<div className="info-wrapper" style={styles.wrapper}>
				<div style={styles.container}>
					<span><Icon icon="calendar"></Icon></span>
					 <span>{progressInfo}</span>
				</div>
				<LanguageSwitch disable={user.loading} handleChange={this._onChange.bind(this)}  languagePreference={languagePreference} />
			</div>
	 	) 

	}

}

const mapDispactorToProps = (dispatch) => { 
	return {
		updateUserProfile : (date,stageOfParenting,displayName,languagePreference) => dispatch(updateUserProfile(date,stageOfParenting,displayName,languagePreference))
}};

export default connect(null,mapDispactorToProps)(MenuBar)
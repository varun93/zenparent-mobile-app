import React,{Component} from 'react';
import ParentingStageInput from '../components/ParentingStageInput';
import {updateUserProfile} from '../actions/userActions';
import {connect} from 'react-redux';

const mapStateToProps = (state,ownProps) => {

	return {
		user : state.user,
		navigator : ownProps.navigator
	}

};

const mapDispactorToProps = (dispatch) => { 
	return {
		updateUserProfile : (date,stageOfParenting,displayName,languagePreference) => dispatch(updateUserProfile(date,stageOfParenting,displayName,languagePreference))
}};

export default connect(mapStateToProps,mapDispactorToProps)(ParentingStageInput)

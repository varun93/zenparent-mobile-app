import React,{Component} from 'react';
import ParentingStageInput from '../components/ParentingStageInput';
import {updateParentingStage} from '../actions/userActions';
import {connect} from 'react-redux';

const mapStateToProps = (state,ownProps) => {

	return {
		user : state.user,
		navigator : ownProps.navigator
	}

};

const mapDispactorToProps = (dispatch) => { 
	return {
		 updateParentingStage : (date) => dispatch(updateParentingStage(date))
}};

export default connect(mapStateToProps,mapDispactorToProps)(ParentingStageInput)

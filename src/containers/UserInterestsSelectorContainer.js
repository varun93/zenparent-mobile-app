import React,{Component} from 'react';
import UserInterestsSelector from '../components/UserInterestsSelector';
import {updateUserInterests} from '../actions/userActions';
import {fetchInterests,toggleInterest} from '../actions/userInterestsActions';
import {connect} from 'react-redux';

const mapDispactorToProps = (dispatch,ownProps) => { 
	return {
		fetchInterests : () => dispatch(fetchInterests()),
		updateUserInterests : (interests,navigator) => dispatch(updateUserInterests(interests,navigator)),
		toggleInterest : (term) => dispatch(toggleInterest(term))
}};

const mapStateToProps = (state,ownProps) => {
	return {
		loading : state.user.loading,
		interests : state.userInterests.interests,
		navigator : ownProps.navigator
}};

export default connect(mapStateToProps,mapDispactorToProps)(UserInterestsSelector);
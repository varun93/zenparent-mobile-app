import React,{Component} from 'react';
import UserInterestsSelector from '../components/UserInterestsSelector';
import {syncFeed} from '../actions/blogActions';
import {updateUserInterests,toggleInterest,fetchInterests} from '../actions/userInterestsActions';
import {connect} from 'react-redux';


const mapDispactorToProps = (dispatch,ownProps) => { 
	return {
		fetchInterests : () => dispatch(fetchInterests()),
		updateUserInterests : (interests,navigator) => dispatch(updateUserInterests(interests,navigator)),
		toggleInterest : (term) => dispatch(toggleInterest(term)),
		syncFeed : () => dispatch(syncFeed())

}};

const mapStateToProps = (state,ownProps) => {
	return {
		updateStatus : state.user.status,
		loading : state.user.loading,
		interests : state.userInterests.interests,
		navigator : ownProps.navigator
}};

export default connect(mapStateToProps,mapDispactorToProps)(UserInterestsSelector);
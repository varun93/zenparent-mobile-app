import React,{Component} from 'react';
import UserInterestsSelector from '../components/UserInterestsSelector';
import {updateUserInterests} from '../actions/userActions';
import {fetchInterests,toggleInterest} from '../actions/blogActions';
import {connect} from 'react-redux';


const mapDispactorToProps = (dispatch) => { 
	return {
		fetchInterests : () => dispatch(fetchInterests()),
		updateUserInterests : (interests) => dispatch(updateUserInterests(interests)),
		toggleInterest : (term) => dispatch(toggleInterest(term))
}};

const mapStateToProps = (state,ownProps) => {
	return {
		updateStatus : state.user.status,
		interests : state.blog.interests,
		navigator : ownProps.navigator
}};

export default connect(mapStateToProps,mapDispactorToProps)(UserInterestsSelector);
import React,{Component} from 'react';
import AuthScreen from '../components/AuthScreen';
import {checkUserStatus} from '../actions/userActions';
import {connect} from 'react-redux';



const mapStateToProps = (state,ownProps) => {

	return {
		autheticated : state.user.autheticated,
		status : state.user.status,
		loading : state.user.loading,
		userInfo : state.user.userInfo,
		navigator : ownProps.navigator
	}

};

const mapDispactorToProps = (dispatch) => { 
	return {
		 checkUserStatus : (userEmail) => dispatch(checkUserStatus(userEmail))
}};

export default connect(mapStateToProps,mapDispactorToProps)(AuthScreen)

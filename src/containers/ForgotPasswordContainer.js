import React,{Component} from 'react';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
import {forgotPassword} from '../actions/userActions';
import {connect} from 'react-redux';


const mapStateToProps = (state,ownProps) => {

	return {
		user : state.user,
		navigator : ownProps.navigator
	}

};

const mapDispactorToProps = (dispatch) => { 
	return {
		 forgotPassword : (userEmail) => dispatch(forgotPassword(userEmail))
}};

export default connect(mapStateToProps,mapDispactorToProps)(ForgotPasswordScreen)

import React,{Component} from 'react';
import SignupScreen from '../components/SignupScreen';
import {signup} from '../actions/userActions';
import {connect} from 'react-redux';


const mapStateToProps = (state,ownProps) => {

	return {
		user : state.user,
		navigator : ownProps.navigator
	}

};

const mapDispactorToProps = (dispatch) => { 
	return {
		signup : (userEmail,userPassword,date,languagePreference,navigator) => dispatch(signup(userEmail,userPassword,date,languagePreference,navigator))
}};

export default connect(mapStateToProps,mapDispactorToProps)(SignupScreen)

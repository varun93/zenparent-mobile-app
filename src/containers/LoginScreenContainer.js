import React,{Component} from 'react';
import LoginScreen from '../components/LoginScreen';
import {login} from '../actions/userActions';
import {connect} from 'react-redux';



const mapStateToProps = (state,ownProps) => {

	return {
		user : state.user,
		navigator : ownProps.navigator
	}

};

const mapDispactorToProps = (dispatch) => { 
	return {
		 login : (userEmail,userPassword) => dispatch(login(userEmail,userPassword))
}};

export default connect(mapStateToProps,mapDispactorToProps)(LoginScreen)

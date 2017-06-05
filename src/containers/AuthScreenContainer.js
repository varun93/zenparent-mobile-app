import React,{Component} from 'react';
import AuthScreen from '../components/AuthScreen';
import {checkUserStatus,tokenSignin} from '../actions/userActions';
import {connect} from 'react-redux';

const mapStateToProps = (state,ownProps) => {

	return {
		user : state.user,
		navigator : ownProps.navigator
	}

};

const mapDispactorToProps = (dispatch) => { 
	return {
		checkUserStatus : (userEmail,navigator) => dispatch(checkUserStatus(userEmail,navigator)),
		tokenSignin : (accessToken,socialUniqueId,userEmail,displayName,imageUrl,loginBy,navigator) => dispatch(tokenSignin(accessToken,socialUniqueId,userEmail,displayName,imageUrl,loginBy,navigator))
}};

export default connect(mapStateToProps,mapDispactorToProps)(AuthScreen)

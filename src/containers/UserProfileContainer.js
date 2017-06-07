import React,{Component} from 'react';
import UserProfile from '../components/UserProfile';
import {updateUserProfile,logout,uploadUserProfilePic} from '../actions/userActions';
import {connect} from 'react-redux';


const mapStateToProps = (state,ownProps) => {
	return {
		user : state.user,
		navigator : ownProps.navigator
	}
};

const mapDispactorToProps = (dispatch) => { 
	return {
		updateUserProfile : (date,stageOfParenting,displayName,languagePreference) => dispatch(updateUserProfile(date,stageOfParenting,displayName,languagePreference)),
		uploadUserProfilePic : (imageUri) => dispatch(uploadUserProfilePic(imageUri)),
 		logout : () => dispatch(logout())
}};

export default connect(mapStateToProps,mapDispactorToProps)(UserProfile)

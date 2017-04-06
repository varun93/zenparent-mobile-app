import React,{Component} from 'react';
import UserProfile from '../components/UserProfile';
import {updateUserProfile,logout,uploadUserProfilePic} from '../actions/userActions';
import {syncFeed} from '../actions/blogActions'; 
import {connect} from 'react-redux';


const mapStateToProps = (state,ownProps) => {
	return {
		user : state.user,
		navigator : ownProps.navigator
	}
};

const mapDispactorToProps = (dispatch) => { 
	return {
		updateUserProfile : (date,stageOfParenting,displayName) => dispatch(updateUserProfile(date,stageOfParenting,displayName)),
		uploadUserProfilePic : (imageUri) => dispatch(uploadUserProfilePic(imageUri)),
 		syncFeed : () => (dispatch(syncFeed())),
		logout : () => dispatch(logout())
}};

export default connect(mapStateToProps,mapDispactorToProps)(UserProfile)

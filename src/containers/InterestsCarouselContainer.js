import React,{Component} from 'react';
import {connect} from 'react-redux';
import InterestsCarousel from '../components/InterestsCarousel';
import {fetchInterests} from '../actions/blogActions';

const mapDispactorToProps = (dispatch) => { 
	return {
		fetchInterests : () => dispatch(fetchInterests())
}};

const mapStateToProps = (state,ownProps) => {
	return {
		interests : state.blog.interests
}};

export default connect(mapStateToProps,mapDispactorToProps)(InterestsCarousel);

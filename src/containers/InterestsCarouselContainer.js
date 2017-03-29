import React,{Component} from 'react';
import {connect} from 'react-redux';
import InterestsCarousel from '../components/InterestsCarousel';
import {fetchInterests} from '../actions/blogActions';

class InterestsCarouselContainer extends Component{

	componentDidMount(){
		this.props.fetchInterests();
	}

	render(){

		const {interests,navigator,position} = this.props;
		
		return (
			<InterestsCarousel position={position} interests={interests} navigator={navigator} />
		)
		
	}

}

const mapDispactorToProps = (dispatch) => { 
	return {
		fetchInterests : () => dispatch(fetchInterests())
}};

const mapStateToProps = (state,ownProps) => {
	return {
		interests : state.blog.interests
}};

export default connect(mapStateToProps,mapDispactorToProps)(InterestsCarouselContainer);

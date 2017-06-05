import React,{Component} from 'react';
import {connect} from 'react-redux';
import InterestsCarousel from '../components/InterestsCarousel';
import {toggleLikeRequest,toggleBookmarkRequest} from '../actions/blogActions';
import {fetchInterests} from '../actions/userInterestsActions';

class InterestsCarouselContainer extends Component{

	constructor(props,context){
		super(props,context);
		this.state = {retry : 0};
	}

	componentDidMount(){
		this.props.fetchInterests();
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.interests.error && this.state.retry < 3){
			this.props.fetchInterests();
			this.setState({retry : this.state.retry + 1});
		}
	}

	render(){

		const {interests,navigator,position,toggleLike,toggleBookmark} = this.props;
		
		return (
			<InterestsCarousel toggleLike={toggleLike} toggleBookmark={toggleBookmark} position={position} interests={interests} navigator={navigator} />
		)
		
	}

}

const mapDispactorToProps = (dispatch) => { 
	return {
		fetchInterests : () => dispatch(fetchInterests()),
		toggleLike : (id) => dispatch(toggleLikeRequest(id)),
		toggleBookmark : (id) => dispatch(toggleBookmarkRequest(id))
}};

const mapStateToProps = (state,ownProps) => {
	return {
		interests : state.userInterests.interests
}};

export default connect(mapStateToProps,mapDispactorToProps)(InterestsCarouselContainer);

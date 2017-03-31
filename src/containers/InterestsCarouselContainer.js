import React,{Component} from 'react';
import {connect} from 'react-redux';
import InterestsCarousel from '../components/InterestsCarousel';
import {fetchInterests} from '../actions/blogActions';

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

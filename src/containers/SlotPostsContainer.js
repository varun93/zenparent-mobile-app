import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsListWrapper from '../templates/PostsListWrapper';
import {fetchSlotPosts,toggleLike,toggleBookmark} from '../actions/blogActions';
import {getPosts,hompepageTitle,isFieldEmpty,hasUserInfoChanged} from '../utils';
import CarouselLoader from '../templates/CarouselLoader';
import PostsCarousel from '../components/PostsCarousel';
import {HOMEPAGE_SLOT_POSTS} from '../constants';

class SlotPostsContainer extends Component{

	constructor(props,context){
		super(props,context);
		this.state = {retry : 0};
		this.requestSlotPosts.bind(this);
	}

	componentDidMount(){
		// make a request only if the user is authenticated
		this.props.user.authenticated && this.requestSlotPosts();	
	}


	requestSlotPosts(){
		this.props.fetchSlotPosts(HOMEPAGE_SLOT_POSTS);
	}

	//loading
	componentWillReceiveProps(nextProps){

		if(!this.props.user.authenticated || this.props.slotPosts.loading || this.props.user.loading) {
			return;
		}

    	if((nextProps.slotPosts.error || isFieldEmpty(nextProps.slotPosts.posts) || nextProps.slotPosts.length == 0) && this.state.retry < 3){
			this.requestSlotPosts();
			this.setState({retry : this.state.retry + 1});
		}
	
	}

	render(){

		const {user,slotPosts,posts,toggleLike,toggleBookmark,position,navigator} = this.props;
		
		if(slotPosts.loading){
			return (
				<CarouselLoader />
			)
		}


		return (
			<div>
				<PostsCarousel title={hompepageTitle(user)} toggleLike={toggleLike} toggleBookmark={toggleBookmark} position={position} posts={getPosts(slotPosts.posts,posts)} navigator={navigator} />
			</div>
		);

		
	}

}

const mapStateToProps = (state) => {
	return {
		posts  : state.blog.posts.byId,
		slotPosts : state.blog[HOMEPAGE_SLOT_POSTS]
	};
};

const mapDispactorToProps = (dispatch) => {
	return {
		fetchSlotPosts : (key) => dispatch(fetchSlotPosts(key)),
		toggleLike : (id) => dispatch(toggleLike(id)),
		toggleBookmark : (id) => dispatch(toggleBookmark(id))
	};
};

export default connect(mapStateToProps,mapDispactorToProps)(SlotPostsContainer);

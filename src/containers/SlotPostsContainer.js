import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsListWrapper from '../templates/PostsListWrapper';
import {fetchSlotPosts,toggleLike,toggleBookmark,HOMEPAGE_SLOT_POSTS} from '../actions/blogActions';
import {getPosts} from '../utils';
import CarouselLoader from '../templates/CarouselLoader';
import PostsCarousel from '../components/PostsCarousel';

class SlotPostsContainer extends Component{

	componentDidMount(){
		this.props.fetchSlotPosts(HOMEPAGE_SLOT_POSTS);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.update == false && nextProps.update == true){
			this.props.fetchSlotPosts(HOMEPAGE_SLOT_POSTS);
		}
	}

	render(){

		let posts = [];
		
		if(this.props.slotPosts.loading){
			return (
				<CarouselLoader />
			)
		}
		else{
			posts = getPosts(this.props.slotPosts.posts,this.props.posts);
		}
		
		return (
			<div>
				<PostsCarousel title="Your Stories" toggleLike={this.props.toggleLike} toggleBookmark={this.props.toggleBookmark} position="5" posts={posts} navigator={this.props.navigator} />
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

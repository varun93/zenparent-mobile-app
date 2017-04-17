import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsListWrapper from '../templates/PostsListWrapper';
import {fetchSlotPosts,toggleLike,toggleBookmark,HOMEPAGE_SLOT_POSTS} from '../actions/blogActions';
import {getPosts,hompepageTitle,isFieldEmpty} from '../utils';
import CarouselLoader from '../templates/CarouselLoader';
import PostsCarousel from '../components/PostsCarousel';

class SlotPostsContainer extends Component{

	constructor(props,context){
		super(props,context);
		this.state = {retry : 0};
	}

	componentDidMount(){
		this.props.fetchSlotPosts(HOMEPAGE_SLOT_POSTS);
	}


	componentWillReceiveProps(nextProps){
		if(this.props.update == false &&  nextProps.update == true){
			this.props.fetchSlotPosts(HOMEPAGE_SLOT_POSTS);
		}

		if(!nextProps.slotPosts.loading && (nextProps.slotPosts.error || isFieldEmpty(nextProps.slotPosts.posts) || nextProps.slotPosts.length == 0) && this.state.retry < 3){
			this.props.fetchSlotPosts(HOMEPAGE_SLOT_POSTS);
			this.setState({retry : this.state.retry + 1});
		}
	

	}

	render(){

		let posts = [];
		let title = '';
		
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
				<PostsCarousel title={hompepageTitle(this.props.user)} toggleLike={this.props.toggleLike} toggleBookmark={this.props.toggleBookmark} position={this.props.position} posts={posts} navigator={this.props.navigator} />
			</div>
		);

		
	}


}

const mapStateToProps = (state) => {
	return {
		user : state.user.userInfo,
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

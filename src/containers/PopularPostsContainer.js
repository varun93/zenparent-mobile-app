import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsCarousel from '../components/PostsCarousel';
import {getPosts,isFieldEmpty} from '../utils';
import CarouselLoader from '../templates/CarouselLoader';
import {toggleLikeRequest,toggleBookmarkRequest,fetchPopularPosts} from '../actions/blogActions';
import {POPULAR_POSTS} from '../constants';

class PopularPostsContainer extends Component{

	constructor(props,context){
		super(props,context);
		this.state = {
			loaded : false,
			retry : 0
		};
	}

	componentWillReceiveProps(nextProps){

		const loaded = this.state.loaded;
		const active = nextProps.active;

		if(!loaded && active){
			this.props.fetchPopularPosts(POPULAR_POSTS);
			this.setState({loaded : true});
		}

		if(active && isFieldEmpty(nextProps.popularPosts.posts) && this.state.retry < 3){
			this.props.fetchPopularPosts(POPULAR_POSTS);
			this.setState({retry : this.state.retry + 1});
		}

	}

	render(){

		let posts = [];

		if(this.props.popularPosts.loading){
			return (<CarouselLoader />)
		}
		else{
			posts = getPosts(this.props.popularPosts.posts,this.props.posts);
		}
		
		return (
			<div>
				<PostsCarousel position={this.props.position} title="Top Posts" toggleLike={this.props.toggleLike} toggleBookmark={this.props.toggleBookmark}  posts={posts} navigator={this.props.navigator} />
			</div>
		);

		
	}

}

const mapDispactorToProps = (dispatch,ownProps) => { 
	return {
		fetchPopularPosts : (key) => dispatch(fetchPopularPosts(key)),
		toggleLike : (id) => dispatch(toggleLikeRequest(id)),
		toggleBookmark : (id) => dispatch(toggleBookmarkRequest(id))
}};

const mapStateToProps = (state) => {
	return {
		posts  : state.blog.posts.byId,
		popularPosts : state.blog[POPULAR_POSTS]
	};
};
export default connect(mapStateToProps,mapDispactorToProps)(PopularPostsContainer);
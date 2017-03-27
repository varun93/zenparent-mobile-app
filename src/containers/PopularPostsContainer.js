import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsCarousel from '../components/PostsCarousel';
import {getPosts} from '../utils';
import CarouselLoader from '../templates/CarouselLoader';
import {toggleLike,toggleBookmark,fetchPopularPosts,POPULAR_POSTS} from '../actions/blogActions';

class PopularPostsContainer extends Component{

	componentDidMount(){
		this.props.fetchPopularPosts(POPULAR_POSTS);
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
				<PostsCarousel position="210" title="Top Posts" toggleLike={this.props.toggleLike} toggleBookmark={this.props.toggleBookmark}  posts={posts} navigator={this.props.navigator} />
			</div>
		);

		
	}

}

const mapDispactorToProps = (dispatch,ownProps) => { 
	return {
		fetchPopularPosts : (key) => dispatch(fetchPopularPosts(key)),
		toggleLike : (id) => dispatch(toggleLike(id)),
		toggleBookmark : (id) => dispatch(toggleBookmark(id))
}};

const mapStateToProps = (state) => {
	return {
		posts  : state.blog.posts.byId,
		popularPosts : state.blog[POPULAR_POSTS]
	};
};
export default connect(mapStateToProps,mapDispactorToProps)(PopularPostsContainer);
import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsCarousel from '../components/PostsCarousel';
import CarouselLoader from '../templates/CarouselLoader';
import {getPosts} from '../utils';
import {toggleLike,toggleBookmark,fetchEditorialPosts,EDITORIAL_POSTS} from '../actions/blogActions';

class EditorialPostsContainer extends Component{

	componentDidMount(){
		this.props.fetchEditorialPosts(EDITORIAL_POSTS);
	}

	render(){

		let posts = [];
		
		if(this.props.editorialPosts.loading){
			return (<CarouselLoader />)
		}
		else{
			posts = getPosts(this.props.editorialPosts.posts,this.props.posts);
		}
		
		return (
			<div>
				<PostsCarousel position={this.props.position} title="From The Editor" toggleLike={this.props.toggleLike} toggleBookmark={this.props.toggleBookmark} position="0px" posts={posts} navigator={this.props.navigator} />
			</div>
		);

		
	}

}

const mapDispactorToProps = (dispatch,ownProps) => { 
	return {
		fetchEditorialPosts : (key) => dispatch(fetchEditorialPosts(key)),
		toggleLike : (id) => dispatch(toggleLike(id)),
		toggleBookmark : (id) => dispatch(toggleBookmark(id))
}};

const mapStateToProps = (state) => {
	return {
		posts  : state.blog.posts.byId,
		editorialPosts : state.blog[EDITORIAL_POSTS]
	};
};
export default connect(mapStateToProps,mapDispactorToProps)(EditorialPostsContainer);
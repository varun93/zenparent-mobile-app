import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsCarousel from '../components/PostsCarousel';
import CarouselLoader from '../templates/CarouselLoader';
import {getPosts,isFieldEmpty} from '../utils';
import {toggleLikeRequest,toggleBookmarkRequest,fetchEditorialPosts} from '../actions/blogActions';
import {EDITORIAL_POSTS} from '../constants';

class EditorialPostsContainer extends Component{


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
			this.props.fetchEditorialPosts(EDITORIAL_POSTS);
			this.setState({loaded : true});
		}

		if(active && nextProps.editorialPosts.error && this.state.retry < 3){
			this.props.fetchEditorialPosts(EDITORIAL_POSTS);
			this.setState({retry : this.state.retry + 1});
		}

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
		toggleLike : (id) => dispatch(toggleLikeRequest(id)),
		toggleBookmark : (id) => dispatch(toggleBookmarkRequest(id))
}};

const mapStateToProps = (state) => {
	return {
		posts  : state.blog.posts.byId,
		editorialPosts : state.blog[EDITORIAL_POSTS]
	};
};
export default connect(mapStateToProps,mapDispactorToProps)(EditorialPostsContainer);
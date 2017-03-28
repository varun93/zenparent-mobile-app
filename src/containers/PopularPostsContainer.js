import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsCarousel from '../components/PostsCarousel';
import {getPosts} from '../utils';
import CarouselLoader from '../templates/CarouselLoader';
import {toggleLike,toggleBookmark,fetchPopularPosts,POPULAR_POSTS} from '../actions/blogActions';

class PopularPostsContainer extends Component{

	constructor(props,context){
		super(props,context);
		this.state = {
			loaded : false
		};
	}


	// componentDidMount(){
	// 	// this.props.fetchPopularPosts(POPULAR_POSTS);
	// }

	componentWillReceiveProps(nextProps){

		const loaded = this.state.loaded;
		const active = nextProps.active;

		if(!loaded && active){
			 this.props.fetchPopularPosts(POPULAR_POSTS);
			 this.setState({loaded : true});
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
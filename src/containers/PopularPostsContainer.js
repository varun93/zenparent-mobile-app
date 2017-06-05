import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsCarousel from '../components/PostsCarousel';
import {getPosts,getUserLanguage,hasUserInfoChanged} from '../utils';
import CarouselLoader from '../templates/CarouselLoader';
import {toggleLikeRequest,toggleBookmarkRequest,fetchPopularPosts} from '../actions/blogActions';
import {POPULAR_POSTS} from '../constants';

class PopularPostsContainer extends Component{

	constructor(props,context){
		super(props,context);
		this.state = {
			loaded : false
		};
	}

	componentDidMount(){
		this.props.fetchPopularPosts(POPULAR_POSTS);	
	}


	componentWillReceiveProps(nextProps){

		const loaded = this.state.loaded;
		const active = nextProps.active;
		const nextUserInfo =  nextProps.user.userInfo;
		const currentUserInfo = this.props.user.userInfo;
		const userInfoChanged = hasUserInfoChanged(currentUserInfo,nextUserInfo); 

		if(userInfoChanged || (!loaded && active)){
			// this.props.fetchPopularPosts(POPULAR_POSTS);
			// this.setState({loaded : true});
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
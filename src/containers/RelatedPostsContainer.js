import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsListWrapper from '../templates/PostsListWrapper';
import {getPosts} from '../utils';

class RelatedPostsContainer extends Component{

	render(){
		let {toggleLike,toggleBookmark,navigator,title,posts} = this.props;
		
		return(
			<PostsListWrapper toggleLike={toggleLike} toggleBookmark={toggleBookmark} title='Related Posts' posts={posts} navigator={navigator} /> 
		)
	}

}

const mapStateToProps = (state,ownProps) => {
	return {
		posts : getPosts(ownProps.relatedPosts,state.blog.posts.byId),
		title : 'Related Posts',
		navigator : ownProps.navigator 
	};
};

export default connect(mapStateToProps,null)(RelatedPostsContainer);

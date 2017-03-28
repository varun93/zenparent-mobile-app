import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsList from '../components/PostsList';
import {fetchBookmarkedPosts,toggleLikeRequest,toggleBookmarkRequest,BOOKMARKED_POSTS} from '../actions/blogActions';

class BookmarkedPostsContainer extends Component{

	render(){
		  let options = {};
		  let {navigator,loading,active,exhausted,term,toggleLike,toggleBookmark,fetchBookmarkedPosts,contextualPosts,posts} = this.props;
		  options['term'] = term;
		  options['key'] = BOOKMARKED_POSTS;

		  return (
			<PostsList loading={loading} active={active} exhausted={exhausted} title='Saved Posts' toggleLike={toggleLike} toggleBookmark={toggleBookmark} options={options} navigator={navigator} posts={posts} contextualPosts={contextualPosts} fetchBookmarkedPosts={fetchBookmarkedPosts} />
		 )			
	}

}


const mapStateToProps = (state,ownProps) => {
	return {
		posts : state.blog.posts.byId,
		loading : state.blog[BOOKMARKED_POSTS].loading,
		exhausted : state.blog[BOOKMARKED_POSTS].exhausted,
		contextualPosts : state.blog[BOOKMARKED_POSTS].posts
	};
};

const mapDispactorToProps = (dispatch) => {
	return {
		fetchBookmarkedPosts : (key,offset) => dispatch(fetchBookmarkedPosts(key,offset)),
		 toggleLike : (id) => dispatch(toggleLikeRequest(id)),
		 toggleBookmark : (id) => dispatch(toggleBookmarkRequest(id))
	};
};


export default connect(mapStateToProps,mapDispactorToProps)(BookmarkedPostsContainer);


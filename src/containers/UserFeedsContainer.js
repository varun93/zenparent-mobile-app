import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsList from '../components/PostsList';
import {fetchPosts,toggleLikeRequest,toggleBookmarkRequest} from '../actions/blogActions';

class UserFeedsContainer extends Component {

	
	render(){
		  
		  let options = {};
		  let {navigator,user,loading,title,active,error,exhausted,toggleLike,toggleBookmark,fetchPosts,contextualPosts,posts,section} = this.props;
		  options['key'] = section;

		 return (
			<PostsList user={user} active={active} title={title} error={error} exhausted={exhausted} loading={loading} update={this.props.update} position={this.props.position} toggleLike={toggleLike} toggleBookmark={toggleBookmark} options={options} navigator={navigator} posts={posts} contextualPosts={contextualPosts} fetchPosts={fetchPosts} />
		 )			
	}

} 

const mapDispactorToProps = (dispatch) => { 
	return {
		 fetchPosts : (key,filter,offset) => dispatch(fetchPosts(key,filter,offset)),
		 toggleLike : (id) => dispatch(toggleLikeRequest(id)),
		 toggleBookmark : (id) => dispatch(toggleBookmarkRequest(id))
}};

const mapStateToProps = (state,ownProps) => {
	return {
		posts : state.blog.posts.byId,
		error : state.blog[ownProps.section].error,
		loading : state.blog[ownProps.section].loading,
		exhausted : state.blog[ownProps.section].exhausted,
		contextualPosts : state.blog[ownProps.section].posts
}};

export default connect(mapStateToProps,mapDispactorToProps)(UserFeedsContainer)



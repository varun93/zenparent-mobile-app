import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostsList from '../components/PostsList';
import {fetchArchivePosts,toggleLike,toggleBookmark} from '../actions/blogActions';
import {ARCHIVE_POSTS} from '../constants';

class PostsArchiveContainer extends Component{

	render(){
		  let options = {};
		  let {navigator,loading,user,exhausted,term,title,toggleLike,toggleBookmark,fetchArchivePosts,contextualPosts,posts} = this.props;
		  options['term'] = term;
		  options['key'] = ARCHIVE_POSTS;

		  return (
			<PostsList active={true} user={user} loading={loading} title={title} exhausted={exhausted} toggleLike={toggleLike} toggleBookmark={toggleBookmark} options={options} navigator={navigator} posts={posts} contextualPosts={contextualPosts} fetchArchivePosts={fetchArchivePosts} />
		 )			
	}

}

const getArchivePosts = (term,state) => {

	if(term in state.blog[ARCHIVE_POSTS]){
		return state.blog[ARCHIVE_POSTS][term].list || [];
	}

	return [];
};

const isExhausted = (term,state) => {

	if(term in state.blog[ARCHIVE_POSTS]){
		return state.blog[ARCHIVE_POSTS][term].exhausted || false;
	}

	return false;


};

const isLoading = (term,state) => {
	if(term in state.blog[ARCHIVE_POSTS]){
		return state.blog[ARCHIVE_POSTS][term].loading || false;
	}

	return false;
};

const mapStateToProps = (state,ownProps) => {
	return {
		user : state.user,
		posts : state.blog.posts.byId,
		contextualPosts : getArchivePosts(ownProps.term,state),
		loading : isLoading(ownProps.term,state),
		exhausted : isExhausted(ownProps.term,state)
	};
};

const mapDispactorToProps = (dispatch,ownProps) => {

	return {
		fetchArchivePosts : (key,term,offset,languagePreference) => dispatch(fetchArchivePosts(key,term,offset,languagePreference))
	};
};


export default connect(mapStateToProps,mapDispactorToProps)(PostsArchiveContainer);

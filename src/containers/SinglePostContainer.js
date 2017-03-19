import React,{Component} from 'react';
import {connect} from 'react-redux';
import BlogApi from '../api/BlogApi';
import SinglePost from '../components/SinglePost';
import {fetchSinglePost,toggleLike,toggleBookmark} from '../actions/blogActions';
import {getPost} from '../utils';

class SinglePostContainer extends Component {

	constructor(props,context){
		super(props,context);
	}

	componentDidMount(){
		this.props.fetchSinglePost(this.props.postId);
		this.recordUserReadingHistory.call(this);
	}

	recordUserReadingHistory(){

		const postId = this.props.postId;
		
		BlogApi.recordUserReadingHistory(postId).then((response) => {
			// console.log("User history recorded");
		}).catch((error) => {
		
		});
	}
	
	render(){

		if(this.props.activePost.loading){
			return (<p>Loading ...</p>);
		}
		if(this.props.error){
			return (<p>Error Occurred ... </p>);
		}

		return (
			<SinglePost toggleLike={this.props.toggleLike} toggleBookmark={this.props.toggleBookmark}  navigator={this.props.navigator} post={getPost(this.props.postId,this.props.posts)} />
		)			
	}

} 

const mapDispactorToProps = (dispatch) => { 
	return {
		fetchSinglePost : (id) => dispatch(fetchSinglePost(id)),
		toggleLike : (id) => dispatch(toggleLike(id)),
		toggleBookmark : (id) => dispatch(toggleBookmark(id))
}};

const mapStateToProps = (state,ownProps) => {
	return {
		posts : state.blog.posts.byId,
		activePost : state.blog.activePost,
		postId : ownProps.post.id
}};

export default connect(mapStateToProps,mapDispactorToProps)(SinglePostContainer)


  
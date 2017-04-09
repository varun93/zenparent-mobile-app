import React,{Component} from 'react';
import {ProgressCircular} from 'react-onsenui';
import {connect} from 'react-redux';
import BlogApi from '../api/BlogApi';
import SinglePost from '../components/SinglePost';
import {fetchSinglePost,toggleLikeRequest,toggleBookmarkRequest} from '../actions/blogActions';
import {getPost} from '../utils';

class SinglePostContainer extends Component {

	constructor(props,context){
		super(props,context);
	}

	componentDidMount(){
		this.props.fetchSinglePost(this.props.postId,this.props.fields);
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

		const {activePost,error,toggleLike,toggleBookmark,navigator,postId,posts} = this.props;

		if(activePost.loading){
			return (<ProgressCircular style={{top: "45%", position : "fixed",left: "45%"}} indeterminate/>);
		}
		if(error){
			return (<p>Error Occurred ... </p>);
		}

		console.log(postId);

		return (
			<SinglePost toggleLike={toggleLike} toggleBookmark={toggleBookmark}  navigator={navigator} post={getPost(postId,posts)} />
		)			
	}

} 

const mapDispactorToProps = (dispatch) => { 
	return {
		toggleLike : (id) => dispatch(toggleLikeRequest(id)),
		toggleBookmark : (id) => dispatch(toggleBookmarkRequest(id)),
		fetchSinglePost : (id,fields) => dispatch(fetchSinglePost(id,fields))
}};

const mapStateToProps = (state,ownProps) => {
	return {
		posts : state.blog.posts.byId,
		activePost : state.blog.activePost
}};

export default connect(mapStateToProps,mapDispactorToProps)(SinglePostContainer)


  
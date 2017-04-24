import React, {Component} from 'react';
import {ProgressCircular} from 'react-onsenui';
import Waypoint from 'react-waypoint';
import PostsListWrapper from '../templates/PostsListWrapper';
import {getPosts,hasUserInfoChanged} from '../utils';
import {USER_FEED_TIME,USER_FEED_RELEVANCE,BOOKMARKED_POSTS,ARCHIVE_POSTS} from '../actions/blogActions';


export default class PostsList extends Component{


  constructor(props, context){

    super(props, context);

	this.state = {
	       offset : 0
	    };
	}


	componentWillReceiveProps(nextProps){


		if(this.props.user && this.props.user.authenticated){
			const nextUserInfo = nextProps.user.userInfo;
			const currentUserInfo = this.props.user.userInfo;
			const userInfoChanged = hasUserInfoChanged(currentUserInfo,nextUserInfo); 
			if(userInfoChanged){
				this.setState({offset:0});
				this._loadMoreItems.call(this);
			}
		}
	
	}


	_loadMoreItems(){

		let offset = this.state.offset;
		let {options} =  this.props;
		let key = options.key;
		let languagePreference = 'Hindi';

		if(key == USER_FEED_TIME || key == USER_FEED_RELEVANCE){
			let filter = key == USER_FEED_RELEVANCE ? 'relevance' : 'time';
			this.props.fetchPosts(key,filter,offset,languagePreference);
		}
		else if(key == ARCHIVE_POSTS){
			let term = options.term;
			this.props.fetchArchivePosts(key,term,offset,languagePreference);
		}
		else if(key == BOOKMARKED_POSTS){
			this.props.fetchBookmarkedPosts(key,offset);
		}

		this.setState({offset : (this.state.offset + 10)});
	}
	

	_renderWaypoint() {
		
	 if(!this.props.loading && this.props.active){
	 	 return (<Waypoint onEnter={this._loadMoreItems.bind(this)} /> );
	 }
    }

   
	render(){

		let {toggleLike,title,error,exhausted,toggleBookmark,posts,loading,contextualPosts,navigator} = this.props;
		posts = getPosts(contextualPosts,posts);

		return (
		<div ref="postList">
			<PostsListWrapper title={title} position={this.props.position} toggleLike={toggleLike} toggleBookmark={toggleBookmark} posts={posts} navigator={navigator} />
			{(exhausted || error) ? '' : 
			<div style={{textAlign : "center"}} className="infinite-scroll-example_waypoint">
			 {this._renderWaypoint.call(this)}
			 {posts.length ? <ProgressCircular indeterminate /> : ''}
			</div>
		   }
		</div>
		)
	}
}
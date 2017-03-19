import React, {Component} from 'react';
import {ProgressCircular} from 'react-onsenui';
import Waypoint from 'react-waypoint';
import PostsListWrapper from '../templates/PostsListWrapper';
import {getPosts} from '../utils';
import {USER_FEED_TIME,USER_FEED_RELEVANCE,BOOKMARKED_POSTS,ARCHIVE_POSTS} from '../actions/blogActions';


export default class PostsList extends Component{


  constructor(props, context){

    super(props, context);

	this.state = {
	       offset : 0
	    };
	}

	componentDidMount(){
		 this._loadMoreItems.call(this);
	}

	componentWillReceiveProps(nextProps){

		if(this.props.update == false && nextProps.update == true){
			this.setState({offset:0,loaded : false});
			this._loadMoreItems.call(this);
		}
	}


	_loadMoreItems(){

		let offset = this.state.offset;
		let {options} =  this.props;
		let key = options.key;

		if(key == USER_FEED_TIME || key == USER_FEED_RELEVANCE){
			let filter = key == USER_FEED_RELEVANCE ? 'relevance' : 'time';
			this.props.fetchPosts(key,filter,offset);
		}
		else if(key == ARCHIVE_POSTS){
			let term = options.term;
			this.props.fetchArchivePosts(key,term,offset);
		}
		else if(key == BOOKMARKED_POSTS){
			this.props.fetchBookmarkedPosts(key,offset);
		}

		this.setState({offset : (this.state.offset + 10)});
	}
	

	_renderWaypoint() {
	 if(!this.props.loading){
	 	 return (<Waypoint onEnter={this._loadMoreItems.bind(this)} /> );
	 }
    }

   
	render(){

		let {toggleLike,title,exhausted,toggleBookmark,posts,contextualPosts,navigator} = this.props;

		return (
		<div ref="postList">
			<PostsListWrapper title={title} position={this.props.position} toggleLike={toggleLike} toggleBookmark={toggleBookmark} posts={getPosts(contextualPosts,posts)} navigator={navigator} />
			{exhausted ? '' : 
			<div style={{textAlign : "center"}} className="infinite-scroll-example_waypoint">
			 {this._renderWaypoint.call(this)}
			  <ProgressCircular indeterminate />
			</div>
		   }
		</div>
		)
	}
}
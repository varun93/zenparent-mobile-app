import React,{Component} from 'react';
import {Page} from 'react-onsenui';
import {hasUserInfoChanged} from '../utils';
import {v4} from 'node-uuid';
import getNextRoute from '../utils/getNextRoute'; 
import AuthScreen from '../screens/AuthScreen';
import ProgressInfo from '../templates/ProgressInfo';
import SlotPostsContainer from '../containers/SlotPostsContainer';
import UserFeedsContainer from '../containers/UserFeedsContainer';
import InterestsCarouselContainer from '../containers/InterestsCarouselContainer';
import PopularPostsContainer from '../containers/PopularPostsContainer';
import EditorialPostsContainer from '../containers/EditorialPostsContainer';
import {USER_FEED_RELEVANCE} from '../actions/blogActions';
import SinglePost from '../screens/SinglePost';

export default class Homescreen extends Component{

	constructor(context,props){

		super(context,props);

		this.state = {
			update : false
		};


		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		document.addEventListener('deviceresume', this.onDeviceReady.bind(this), false);
		document.addEventListener('onPushNotification', this.onPushNotification.bind(this), false);

	}


	navigateToPost(postId){
		this.props.navigator.pushPage({component : SinglePost,fields : 'all',postId,key :  v4()});
	}

	// push notification payload handling
    onPushNotification(e) {
       
       	const postId = e.notification.p;

       	if(postId){
       		this.navigateToPost.call(this,postId);	
       	}
       	
    }

	onDeviceReady(){
		
		try{
	      
	        const classContext = this;
	      
	        Branch.initSession(function(data) {
	     
	        const postId = data.p;
	     	
			classContext.navigateToPost.call(classContext,postId);
		    
		});   

	    }
	    catch(e){
	      console.log(e);
	    }
	}

	componentDidUpdate(){

		if(!this.props.user.authenticated){
			this.props.navigator.resetPage({component : AuthScreen,key : v4()});
		}

	}

	
	render(){

		const {navigator,active,user} = this.props;

		return (
			<Page key='homescreen'>
				 <ProgressInfo user={user.userInfo} />
				 <SlotPostsContainer position='88' user={user} navigator={navigator} />
				 <InterestsCarouselContainer position='295' user={user} navigator={navigator} />
				 <UserFeedsContainer active={active} title='Stories Just for You' position='370' section={USER_FEED_RELEVANCE} user={user} navigator={navigator} />
			</Page>
			)
	}
}

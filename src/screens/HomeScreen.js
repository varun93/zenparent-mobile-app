import React,{Component} from 'react';
import {Page} from 'react-onsenui';
import {hasUserInfoChanged,generateNavigationKey} from '../utils';
import AuthScreen from '../screens/AuthScreen';
import SlotPostsContainer from '../containers/SlotPostsContainer';
import UserFeedsContainer from '../containers/UserFeedsContainer';
import InterestsCarousel from '../components/InterestsCarousel';
import PopularPostsContainer from '../containers/PopularPostsContainer';
import EditorialPostsContainer from '../containers/EditorialPostsContainer';
import {USER_FEED_RELEVANCE} from '../actions/blogActions';

export default class Homescreen extends Component{

	constructor(context,props){
		super(context,props);
		this.state = {
			update : false
		};

		document.addEventListener('onCleverTapProfileDidInitialize', this.onCleverTapProfileDidInitialize, false);
	}

	componentDidUpdate(){
		if(!this.props.user.authenticated){
			this.props.navigator.resetPage({component : AuthScreen,key : generateNavigationKey('auth-screen')});
    	}
	}


	componentWillReceiveProps(nextProps){

		if(this.props.user.authenticated){
			const nextUserInfo = nextProps.user.userInfo;
			const currentUserInfo = this.props.user.userInfo;
			this.setState({update : hasUserInfoChanged(currentUserInfo,nextUserInfo)});
		}
		
	}
		
	render(){
		return (
			<Page key='homescreen'>
				 <SlotPostsContainer update={this.state.update} navigator={this.props.navigator} />
				 <InterestsCarousel position='210' navigator={this.props.navigator} />
				 <UserFeedsContainer update={this.state.update} position='340' section={USER_FEED_RELEVANCE} navigator={this.props.navigator} />
			</Page>
			)
	}
}

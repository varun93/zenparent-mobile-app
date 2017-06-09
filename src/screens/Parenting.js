import React,{Component} from 'react';
import {Page} from 'react-onsenui';
import AuthScreen from '../screens/AuthScreen';
import UserFeedsContainer from '../containers/UserFeedsContainer';
import InterestsCarouselContainer from '../containers/InterestsCarouselContainer';
import PopularPostsContainer from '../containers/PopularPostsContainer';
import EditorialPostsContainer from '../containers/EditorialPostsContainer';
import {USER_FEED_TIME} from '../constants';

export default class ParentingScreen extends Component{

  render(){
   
    const {user} = this.props;
    const userAuthenticated = user.authenticated;

    return (
      <Page key='parenting-screen'>
         <EditorialPostsContainer active={this.props.active} position='10' navigator={this.props.navigator} />
         <PopularPostsContainer user={user} active={this.props.active} position='210'  navigator={this.props.navigator} />
         <InterestsCarouselContainer user={user} position='425' navigator={this.props.navigator} />
         <UserFeedsContainer user={user} active={this.props.active} title='Latest Stories of Your Interest' position='545' section={USER_FEED_TIME} navigator={this.props.navigator} />
      </Page>
    )
  }
}



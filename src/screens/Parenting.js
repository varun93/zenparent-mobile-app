import React,{Component} from 'react';
import {Page} from 'react-onsenui';
import AuthScreen from '../screens/AuthScreen';
import UserFeedsContainer from '../containers/UserFeedsContainer';
import InterestsCarousel from '../components/InterestsCarousel';
import PopularPostsContainer from '../containers/PopularPostsContainer';
import EditorialPostsContainer from '../containers/EditorialPostsContainer';
import {USER_FEED_TIME} from '../actions/blogActions';

export default class ParentingScreen extends Component{

  render(){
    return (
      <Page key='parenting-screen'>
         <EditorialPostsContainer active={this.props.active} position='10' navigator={this.props.navigator} />
         <PopularPostsContainer active={this.props.active} position='210'  navigator={this.props.navigator} />
         <InterestsCarousel position='425' navigator={this.props.navigator} />
         <UserFeedsContainer active={this.props.active} title='Latest Stories of Your Interest' position='545' section={USER_FEED_TIME} navigator={this.props.navigator} />
      </Page>
      )
  }
}

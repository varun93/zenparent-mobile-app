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
         <EditorialPostsContainer navigator={this.props.navigator} />
         <PopularPostsContainer navigator={this.props.navigator} />
         <InterestsCarousel position='420' navigator={this.props.navigator} />
         <UserFeedsContainer title='Latest Stories of Your Interest' position='550' section={USER_FEED_TIME} navigator={this.props.navigator} />
      </Page>
      )
  }
}

import React,{Component} from 'react';
import {Page} from 'react-onsenui';
import UserProfileContainer from '../containers/UserProfileContainer';

export default class UserProfile extends Component{

  render(){

  	const {user} = this.props;

    return (
    	<Page>
	        <UserProfileContainer active={this.props.active} navigator={this.props.navigator} />
      	</Page>
      )
  }

}
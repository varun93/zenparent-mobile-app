import React,{Component} from 'react';
import UserProfileContainer from '../containers/UserProfileContainer';

export default class UserProfile extends Component{

  render(){

    return (
        <UserProfileContainer navigator={this.props.navigator} />
      )
  }

}
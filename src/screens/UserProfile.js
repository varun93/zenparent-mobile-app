import React,{Component} from 'react';
import UserProfileContainer from '../containers/UserProfileContainer';

export default class UserProfile extends Component{

  render(){

    return (
        <UserProfileContainer active={this.props.active} navigator={this.props.navigator} />
      )
  }

}
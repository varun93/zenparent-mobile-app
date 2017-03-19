import React,{Component} from 'react';
import UserInterestsSelectorContainer from '../containers/UserInterestsSelectorContainer';


export default class UserInterestsSelector extends Component {

render(){
	return(
		<UserInterestsSelectorContainer  navigator={this.props.navigator}/>
	)
	
	}

}


import React, {Component} from 'react';
import AuthScreenContainer from '../containers/AuthScreenContainer';


export default class AuthScreen extends Component{

	render(){

		return(
			<AuthScreenContainer navigator={this.props.navigator} />
			)
	}

}

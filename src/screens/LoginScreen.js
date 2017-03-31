import React,{Component} from 'react';
import LoginScreenContainer from '../containers/LoginScreenContainer';

export default class LoginScreen extends Component{

		render(){
			return (
				<LoginScreenContainer navigator={this.props.navigator} />	
			);
		}
		
}
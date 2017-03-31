import React,{Component} from 'react';
import SignupScreenContainer from '../containers/SignupScreenContainer';

export default class SignupScreen extends Component{

		render(){
			return (
				<SignupScreenContainer navigator={this.props.navigator} />	
			);
		}
		
}
import React,{Component} from 'react';
import {Page} from 'react-onsenui';
import Toolbar from '../templates/Toolbar';
import ForgotPasswordContainer from '../containers/ForgotPasswordContainer';

export default class ForgotPasswordScreen extends Component{

		render(){
			return (
				<Page className='forgot-password-screen' key='forgot-password-screen'>
					<Toolbar title='' navigator={this.props.navigator} />
					<ForgotPasswordContainer navigator={this.props.navigator} />	
				</Page>	
			);
		}
		
}
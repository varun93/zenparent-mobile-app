import React,{Component} from 'react';
import ParentingStageInputContainer from '../containers/ParentingStageInputContainer';

export default class ParentingStageInputScreen extends Component{

		render(){
			return (
				<ParentingStageInputContainer navigator={this.props.navigator} />	
			);
		}
}
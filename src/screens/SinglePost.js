import React,{Component} from 'react';
import Toolbar from '../templates/Toolbar';
import {Page} from 'react-onsenui';
import SinglePostContainer from '../containers/SinglePostContainer';

export default class SinglePost extends Component{


	render(){

		const {navigator,postId,fields} = this.props;
	
		return (
			<Page key={postId}>
				<Toolbar title='' navigator={navigator} />
				<SinglePostContainer fields={fields} postId={postId} navigator={navigator} />
			</Page>
			)
	}
}
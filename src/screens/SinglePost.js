import React,{Component} from 'react';
import Toolbar from '../templates/Toolbar';
import {Page} from 'react-onsenui';
import SinglePostContainer from '../containers/SinglePostContainer';

export default class SinglePost extends Component{


	render(){
		return (
			<Page key={this.props.post.id}>
				<Toolbar title='' navigator={this.props.navigator} />
				<SinglePostContainer post={this.props.post} navigator={this.props.navigator} />
			</Page>
			)
	}
}
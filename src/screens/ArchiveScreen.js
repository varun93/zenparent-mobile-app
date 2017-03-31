import React,{Component} from 'react';
import {Page} from 'react-onsenui';
import Toolbar from '../templates/Toolbar';
import PostsArchiveContainer from '../containers/PostsArchiveContainer';

export default class ArchiveScreen extends Component{

	render(){
		let {toggleLike,toggleBookmark,navigator,term} = this.props;
		return (
			<Page className="archiveScreen">
				<Toolbar title={term} navigator={this.props.navigator} />
				<PostsArchiveContainer title={term} term={term} navigator={navigator}/>
			</Page>
			)
	}	

}

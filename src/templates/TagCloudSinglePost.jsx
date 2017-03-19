import React from 'react';
import {List} from 'react-onsenui';
import ArchiveScreen from '../screens/ArchiveScreen';
import {generateNavigationKey} from '../utils';

const styles = {

  parent : {
    margin : '10px 0px 0px 0px',
    padding : '0px 10px'
  },
	item : {
		  display: 'inline-block',
    	margin: '0 .3em .3em 0',
   	  display: 'inline-block',
   	 	height: '28px',
    	lineHeight: '28px',
    	padding: '0px 1em',
    	backgroundColor: '#8675A1',
    	borderRadius: '10px',
    	color: 'white',
    	fontSize: '13px',
    	textDecoration: 'none'
	},
  header : {
    fontSize : '20px',
    color: '#FF547C',
    fontWeight : '500',
    margin : '10px 0px 0px 0px'
  }
};

const TagCloudSinglePost = ({tags,title,navigator}) => {

	return (
    <div style={styles.parent} className="tagCloud">
      <List 
  		dataSource = {tags}
  		renderRow = {(tag) => {  return (<li key={tag} onClick={() => navigator.pushPage({component : ArchiveScreen,term : tag,key : generateNavigationKey(tag)})  } style={styles.item}>{tag}</li> ) }}
  	   />
    </div>
	);

};

export default TagCloudSinglePost;
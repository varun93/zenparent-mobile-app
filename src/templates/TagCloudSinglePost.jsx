import React from 'react';
import ArchiveScreen from '../screens/ArchiveScreen';
import {v4} from 'node-uuid';
import {generateNavigationKey} from '../utils';

const styles = {

  parent : {
    margin : '15px 0px 0px 0px',
    padding : '10px'
  },
	item : {
		  display: 'inline-block',
    	margin: '0 .3em .3em 0',
   	  display: 'inline-block',
    	padding: '5px 10px',
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

const TagCloudSinglePost = ({tags=[],title='',toggleLike,toggleBookmark,navigator}) => {

	return (
    <div style={styles.parent} className="tagCloud">
      
      {tags.map(function(tag){
        return (<li key={v4()} onClick={() => navigator.pushPage({component : ArchiveScreen,term : tag,toggleLike,toggleBookmark,key : generateNavigationKey(tag)})  } style={styles.item}>{tag}</li> ) 
      })}
  		
  	</div>
	);

};

export default TagCloudSinglePost;
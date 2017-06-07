import React from 'react';
import {List} from 'react-onsenui';
import ArchiveScreen from '../screens/ArchiveScreen';


const styles = {
	tagDivider : {
		fontWeight: "bold",
    	color: "black",
   	 	fontStyle : "normal"
	}
}

const TagCloudArticleCard = ({tags,toggleLike,toggleBookmark,title,navigator}) => {

  return (
    <div className="tagCloudArticleCard">
      {tags.filter((tag) => isNaN(tag)).map(function(tag,index,tags){
          return <span  onClick={() => navigator.pushPage({component : ArchiveScreen,props:{toggleLike,toggleBookmark,term : tag}})} key={index} style={{fontSize : "13px"}}>
          {tag}{index < tags.length -1 ? <span> | </span>  : ''}
          </span>
      })}
    </div>
  );
};

export default TagCloudArticleCard;
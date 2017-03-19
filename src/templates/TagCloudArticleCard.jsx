import React from 'react';
import {List} from 'react-onsenui';
import ArchiveScreen from '../screens/ArchiveScreen';
import {generateNavigationKey} from '../utils';

const TagCloudArticleCard = ({tags,title,navigator}) => {

  return (
    <div className="tagCloudArticleCard">
      {tags.filter((tag) => isNaN(tag)).map(function(tag,index,tags){
          return <span  onClick={() => navigator.pushPage({component : ArchiveScreen,term : tag,key : generateNavigationKey(tag)})} key={index} style={{fontSize : "13px"}}>{tag}{index < tags.length -1 ? ' | ' : ''}</span>
      })}
    </div>
  );
};

export default TagCloudArticleCard;
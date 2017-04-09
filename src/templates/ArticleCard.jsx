import React from 'react';
import {ListItem,Row,Col} from 'react-onsenui';
import {imageWidth,imageHeight} from '../utils/imageDimensions';
import SinglePost from '../screens/SinglePost';
import TagCloudArticleCard from '../templates/TagCloudArticleCard';
import {generateNavigationKey} from '../utils';
import LazyLoad from 'react-lazy-load';
import {assetsBase} from '../constants';

const prefix = assetsBase();

const styles = {
  cardItem : {
    background : "#fff",
    position: "relative",
    width : "100%",
    padding : "10px 10px 0px 10px",
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12)"
  },
  cardHeader : {
    display : "table",
    width : "100%",
    marginBottom: "10px"
  },
  cardFooter : {
    display : "table",
    width : "100%",
    borderTop : "1px solid #eee"
  },
  imageBlock : {
    width : "25%",
    display: "table-cell",
    verticalAlign : "middle"
  },
  titleBlock : {
    width : "75%",
    paddingRight : "5px",
    display: "table-cell",
    verticalAlign : "middle"
  },
  tagsBlock : {
    width : "75%",
    display: "table-cell",
    verticalAlign : "middle",
    padding: "5px 0px",
    fontStyle : "italic",
    color : "#8675A1",
    overflowWrap: "break-word",
    wordWrap: "break-word",
    wordBreak: "break-word"
  },
  articleLikesBookmarksSection : {
    width : "25%",
    display : "table-cell",
    verticalAlign : "middle"
  },
  image : {
    width : imageWidth,
    height : imageHeight
  },
  listItem : {
    marginBottom : '10px'
  },
  postTitle : {
   fontSize : "14px",
   fontWeight : "bold",
   lineHeight:"1.3",
   letterSpacing: "-.02em!important",
   overflowWrap: "break-word",
   wordWrap: "break-word",
   wordBreak: "break-word"
 },
 postAuthor : {
  fontSize:"16px",
  fontWeight:"bold",
  color:"rgb(255,95,132)"
},
articleLike : {
  float : "right"
},
articleBookmark : {
  float : "right"
}

};

const ArticleCard = ({post,toggleLike,toggleBookmark,navigator}) => {

	const navigationKey = generateNavigationKey(post.id);

  const articleClick = () => {
     navigator.pushPage({component: SinglePost,postId : post.id,key:`single-post-${navigationKey}`}) 
  };


	return (
	<ListItem style={styles.listItem} key={post.id}>
     <div style={styles.cardItem} className="card">
  
    <div style={styles.cardHeader} onClick={() => articleClick()} className="card-header">

     <div style={styles.titleBlock} className="title-section">
        <p style={styles.postTitle} className="title">
          {post.title}
        </p>
      </div>

      <div style={styles.imageBlock} className="img-section">
        <LazyLoad height={imageHeight} offset={100}>
          <img style={styles.image} src={post.attachment_url} />
        </LazyLoad>
      </div>  
      
    </div>

    <div style={styles.cardFooter} className="card-footer">
      
        <div style={styles.tagsBlock} className="tags-section">
            <TagCloudArticleCard toggleLike={toggleLike} toggleBookmark={toggleBookmark} tags={post.tags} navigator={navigator} />
        </div>
        
      <div style={styles.articleLikesBookmarksSection} className="likes-bookmarks">

           <div onClick={() => toggleBookmark(post.id)} style={styles.articleBookmark} className="articleBookmark">
            {post.bookmarked ? <img src={`${prefix}bookmark-active.svg`} /> : <img src={`${prefix}bookmark-default.svg`} />}
          </div>
      
          <div onClick={() => toggleLike(post.id)}  style={styles.articleLike} className="articleLike">
            {post.liked ? <img src={`${prefix}like-active.svg`}/> : <img src={`${prefix}like-default.svg`} />}
          </div>
          
      </div>
    

    </div>

</div>
    
	</ListItem>
	);

};

export default ArticleCard;


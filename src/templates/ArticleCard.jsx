import React from 'react';
import {ListItem,Row,Col} from 'react-onsenui';
import {imageWidth,imageHeight} from '../utils/imageDimensions';
import SinglePost from '../screens/SinglePost';
import TagCloudArticleCard from '../templates/TagCloudArticleCard';
import {generateNavigationKey} from '../utils';
import LazyLoad from 'react-lazy-load';

const styles = {
  cardItem : {
    background : "#fff",
    position: "relative",
    width : "100%",
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12)"
  },
  cardHeader : {
    display : "table",
    width : "100%",
    marginBottom: "5px"
  },
  cardFooter : {
    display : "table",
    width : "100%",
    padding : "5px 0px"
  },
  imageBlock : {
    width : "25%",
    display: "table-cell",
    verticalAlign : "middle"
  },
  titleBlock : {
    width : "75%",
    paddingLeft : "15px",
    display: "table-cell",
    verticalAlign : "middle"
  },
  tagsBlock : {
    width : "75%",
    paddingLeft : "15px",
    display: "table-cell",
    verticalAlign : "middle",
    textAlign : "right",
    fontStyle : "italic",
    color : "#8675A1"
  },
  articleLikesBookmarksSection : {
    width : "100%",
    paddingTop : "5px",
    borderTop : "1px solid #eeeeee"
  },
  image : {
    width : imageWidth,
    height : imageHeight
  },
  listItem : {
    marginBottom : '10px'
  },
  postTitle : {
   fontSize : "16px",
   fontWeight : "bold",
   lineHeight:"1.1",
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
  float : "left"
},
articleBookmark : {
  float : "right"
}

};

const ArticleCard = ({post,toggleLike,toggleBookmark,navigator}) => {

	const navigationKey = generateNavigationKey(post.id);

  const articleClick = () => {
     navigator.pushPage({component: SinglePost,post,key:`single-post-${navigationKey}`}) 
  };


	return (
	<ListItem style={styles.listItem} key={post.id}>
     <div style={styles.cardItem} className="card">
  
    <div style={styles.cardHeader} onClick={() => articleClick()} className="card-header">

      <div style={styles.imageBlock} className="img-section">
        <LazyLoad height={imageHeight}>
          <img style={styles.image} src={post.attachment_url} />
        </LazyLoad>
      </div>  
      
      <div style={styles.titleBlock} className="title-section">
        <p style={styles.postTitle} className="title">
          {post.title}
        </p>
      </div>
     
    </div>

    <div style={styles.cardFooter} className="card-footer">
      
        <div style={styles.tagsBlock} className="tags-section">
            <TagCloudArticleCard toggleLike={toggleLike} toggleBookmark={toggleBookmark} tags={post.tags} navigator={navigator} />
        </div>
    
    </div>

    <div style={styles.articleLikesBookmarksSection} className="likes-bookmarks">

      <div onClick={() => toggleLike(post.id)} style={styles.articleLike} className="articleLike">
          {post.liked ? <img src="/assets/like-active.png" /> : <img src="/assets/like-default.png" />}
      </div>
                     
      <div onClick={() => toggleBookmark(post.id)} style={styles.articleBookmark} className="articleBookmark">
          {post.bookmarked ? <img src="/assets/bookmark-active.png" /> : <img src="/assets/bookmark-default.png" />}
      </div>

    </div>


</div>
    
	</ListItem>
	);

};

export default ArticleCard;


import React, {Component} from 'react';
import {Row,Col} from 'react-onsenui';
import TagCloudSinglePost from '../templates/TagCloudSinglePost';
import RelatedPostsContainer from '../containers/RelatedPostsContainer';
require('../styles/single-article.css');

const styles = {

  pageContent : {
    margin : '45px 0px 60px 0px',
    lineHeight : '1.5',
    background : 'white'
  },
  postContent : {
    padding : "0px 10px",
    textAlign : "left"
  },
  postTitle : {
    fontSize:"18px",
    lineHeight:"1.4",
    fontWeight:"bold",
    padding:"10px"
  },
  authorBlock:{
    marginBottom:"10px",
    padding : "0px 10px"
  },
  postAuthor : {
    padding:"10px",
    fontWeight:"500"
  },
  featuredImage : {
    textAlign : "center"
  },
  footer : {
    height : "50px",
    left : "0px",
    padding:"0px 10px",
    background:"white",
    color:"#8675A1",
    fontWeight:"bold",
    width:"100%",
    textAlign:"center",
    position:"fixed",
    bottom:"0px"
  }

};

const SinglePost = ({post,toggleLike,toggleBookmark,navigator}) => {
	return (
		
		 <div style={styles.pageContent} className="single-post page-content">
              
            <Row style={styles.postTitle}>
              {post.title}
            </Row>
              
            <Row style={styles.authorBlock} className="author-tab">
                <Col width="10%" verticalAlign="center">
                    <img src="https://res.cloudinary.com/dooujtlec/image/upload/v1483939473/zen-140x140_nfbynw.jpg" style={{borderRadius:"50%",height:"40px",width:"40px"}} />                    
                </Col>
                <Col style={styles.postAuthor} verticalAlign="center">
                  <p>{post.author}</p>
                </Col>
            </Row>
              
            <p style={styles.featuredImage}>
              <img style={{maxWidth:"100%"}} src={post.attachment_url} />
            </p>

            <div style={styles.postContent} className="article-content"  dangerouslySetInnerHTML={{__html: post.postContent}} />
            
            <TagCloudSinglePost className="tagCloud" tags={post.tags} navigator={navigator} />
		 
		        <div className="relatedPosts">
		          {post.relatedPosts && post.relatedPosts.length && <RelatedPostsContainer toggleLike={toggleLike} toggleBookmark={toggleBookmark}  relatedPosts={post.relatedPosts} navigator={navigator} /> }
		        </div>

		        <div style={styles.footer} className="page-footer">
              <div onClick={() => toggleLike(post.id)}  className="articleLike">
                  {post.liked ? <img src="/assets/like-active.svg" /> : <img src="/assets/like-default.svg" />}
              </div>
              <div onClick={() => toggleBookmark(post.id)} style={{margin : "0 25%"}} className="articleBookmark">
                 {post.bookmarked ? <img src="/assets/bookmark-active.svg" /> : <img src="/assets/bookmark-default.svg" />}
              </div>
              <ons-icon size="32px" icon="fa-share-alt"></ons-icon>
            </div>

		</div>
	)
};


export default SinglePost;

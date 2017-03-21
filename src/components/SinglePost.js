import React, {Component} from 'react';
import {Row,Col,BottomToolbar} from 'react-onsenui';
import TagCloudSinglePost from '../templates/TagCloudSinglePost';
import RelatedPostsContainer from '../containers/RelatedPostsContainer';
import {assetsBase} from '../constants';
require('../styles/single-article.css');

const prefix = assetsBase();

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
    paddingLeft:"15px",
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

  const sharePost = () => {
        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        var options = {
          message: 'Share this', // not supported on some apps (Facebook, Instagram)
          subject: post.post_title, // fi. for email
          files: ['', ''], // an array of filenames either locally or remotely
          url: post.permalink,
          chooserTitle: post.post_title // Android only, you can override the default share sheet title
        }

        var onSuccess = function(result) {
          // console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
          // console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        }

        var onError = function(msg) {
          // console.log("Sharing failed with message: " + msg);
        }

        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

  };


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
                  {post.author}
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
                  {post.liked ? <img src={`${prefix}like-active.svg`}/> : <img src={`${prefix}like-default.svg`} />}
              </div>
              <div onClick={() => toggleBookmark(post.id)} style={{margin : "0 25%"}} className="articleBookmark">
                 {post.bookmarked ? <img src={`${prefix}bookmark-active.svg`} /> : <img src={`${prefix}bookmark-default.svg`} />}
              </div>
              <ons-icon onClick={() => sharePost()} size="30px" icon="fa-share-alt"></ons-icon>
            </div>

		</div>
	)
};


export default SinglePost;

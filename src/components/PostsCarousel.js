import React,{Component} from 'react';
import  {Carousel,CarouselItem} from 'react-onsenui';
import SinglePost from '../screens/SinglePost';
import {generateNavigationKey} from '../utils';

const styles = {

	carouselItem  : {
		marginLeft : '5px'
	},
	featuredImage : {
	    height: '150px',
	    width: '95%',
	    objectFit: 'cover'
	},
	articleTitle : {
		  position: 'absolute',
	      bottom: '65px',
	      width : '95%',
	      color : 'white',
	      fontSize : "13px",
	      fontWeight : "600",
	      textAlign : "center",
	      lineHeight : "1.2"
	},
	overlay : {
	    width: '89.5%',
	    position: 'absolute',
	    bottom: '0',
	    height:"150px",
	    padding: '5px',
	    color: 'white',
	    background: 'rgba(0, 0, 0, 0.4)',
	    display: 'block',
	    textOverflow: 'ellipsis',
	    wordWrap: 'breakWord',
	    overflow: 'hidden'
	 	}
};



const screenWidth =  window.innerWidth;


export default class PostsCarousel extends Component{ 

	constructor(props,context){
		super(props,context);
	}


	renderCarouselItem(post){
		const navigationKey = generateNavigationKey(post.id);
		return (
			<CarouselItem style={styles.carouselItem} onClick={() => this.props.navigator.pushPage({component: SinglePost,toggleLike:this.props.toggleLike,toggleBookmark : this.props.toggleBookmark,key:`single-post-${navigationKey}`,post})} key={post.id}>
	      		<div style={{position : "relative"}}>
		      		<div className="image">
		      			<img style={styles.featuredImage} src={post.attachment_url} />
		  	  		</div>
		  	  		<div style={styles.overlay}>
		  	  		</div>
		  	  		<div style={styles.articleTitle}>
		  	  			{post.title}
		  	  		</div>
	  	  		</div>
  			</CarouselItem>
		)
	}

	render(){

		let position = this.props.position || 0;
		position = parseInt(position);

		return(
			<div>
				<p style={{position:'absolute',top : `${position}px`,left : '5px',fontWeight:'bold',color : 'rgb(255, 84, 124)'}}>{this.props.title}</p>	
				<Carousel style={{top : `${position+30}px`,height : '150px'}} ref="carousel" direction="horizontal" itemWidth={window.innerWidth > 450 ? `200px` : `48%`} initialIndex="0" autoScroll autoRefresh overscrollable fullscreen swipeable>
					{this.props.posts.map(this.renderCarouselItem.bind(this))}
				</Carousel>
			</div>
		)
	}
}


import React,{Component} from 'react';
import  {Carousel,CarouselItem} from 'react-onsenui';
import SinglePost from '../screens/SinglePost';
import {v4} from 'node-uuid';

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
	
		this.numberOfItemsInViewport = (screenWidth > 450) ?  Math.ceil(screenWidth/200) : 3;

		this.state = {
			lazyLoaded : []
		};
		
	}

	componentDidMount(){
		this.lazyLoadImages.call(this,0,this.numberOfItemsInViewport);
	}


	renderCarouselItem(post,index){
		

		return (
			<CarouselItem  style={styles.carouselItem} onClick={() => this.props.navigator.pushPage({component: SinglePost,toggleLike:this.props.toggleLike,toggleBookmark : this.props.toggleBookmark,key:v4(),postId : post.id })} key={v4()}>
	      		<div style={{position : "relative"}}>
		      		<div className="image">
		      			{
		      				this.state.lazyLoaded.indexOf(index) !== -1 ?
		      				<img style={styles.featuredImage} src={post.attachment_url} /> :
		      				<img style={styles.featuredImage} data-src={post.attachment_url} /> 
		  	  			}
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

	lazyLoadImages(startIndex,endIndex){

		let lazyLoaded = this.state.lazyLoaded;

		for(let i=startIndex;i<=endIndex;i++){
			if(lazyLoaded.indexOf(i) === -1){
				lazyLoaded = lazyLoaded.concat(i);	
			}
																
		}

		this.setState({lazyLoaded : lazyLoaded});

	}


	postChange(e){
		const activeIndex = e.activeIndex;
		const itemsInViewport = this.numberOfItemsInViewport;
		const startIndex = activeIndex;
		const posts = this.props.posts;
		let endIndex = itemsInViewport + activeIndex;
		endIndex = endIndex > posts.length - 1 ? posts.length - 1 : endIndex;
		this.lazyLoadImages.call(this,startIndex,endIndex);	
	}

	render(){

		let position = parseInt(this.props.position) || 0;
	
		return(
			<div>
				<p style={{position:'absolute',top : `${position}px`,left : '5px',fontWeight:'bold',color : 'rgb(255, 84, 124)'}}>{this.props.title}</p>	
				<Carousel style={{top : `${position+30}px`,height : '150px'}} ref="carousel" direction="horizontal" itemWidth={screenWidth > 450 ? `200px` : `48%`} initialIndex="0" onPostChange={this.postChange.bind(this)} autoScroll autoRefresh overscrollable fullscreen swipeable>
					{this.props.posts.map(this.renderCarouselItem.bind(this))}
				</Carousel>
			</div>
		)
	}
}

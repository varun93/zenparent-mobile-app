import React,{Component} from 'react';
import {Carousel,CarouselItem} from 'react-onsenui';
import {fetchInterests} from '../actions/blogActions';
import ArchiveScreen from '../screens/ArchiveScreen';
import CarouselLoader from '../templates/CarouselLoader';
import UserInterestsSelector from '../screens/UserInterestsSelector';
import {v4} from 'node-uuid';

const styles = {

	carouselItem : {
		marginLeft : '5px'
	},
	featuredImage : {
	    height: '90px',
	    width: '93%',
	    objectFit: 'cover'
	},
	articleTitle : {
		position: 'absolute',
	    bottom: '40px',
	    width : '100%',
	    color : 'white',
	    fontSize : "12px",
	    fontWeight : "600",
	    textAlign : "center",
	    lineHeight : "1.2"
	},
	overlay : {
	    width: '85%',
	    position: 'absolute',
	    bottom: '0',
	    height:"90px",
	    padding: '5px',
	    color: 'white',
	    background: 'rgba(0, 0, 0, 0.4)',
	    display: 'block',
	    textOverflow: 'ellipsis',
	    wordWrap: 'breakWord',
	    overflow: 'hidden'
	  },
	  addMore : {
	  	position : 'relative',
	  	background : '#eeeeee',
	  	height : '90px',
	  	marginLeft: '10px',
        marginTop: '35px'
	 },
	 addMoreIcon : {
	 	position : 'absolute',
	 	bottom   : '30px',
	 	left : '40px' 
	 }
};

const screenWidth =  window.innerWidth;

export default class InterestsCarousel extends Component{ 


	constructor(props,context){

		super(props,context);

		this.numberOfItemsInViewport = (screenWidth > 450) ?  Math.ceil(screenWidth/120) : 3;

		this.state = {
			lazyLoaded : []
		};
	}

	componentDidMount(){
		this.lazyLoadImages.call(this,0,this.numberOfItemsInViewport);
	}


	renderCarouselItem(interest,index){
		if(interest.term == 'last'){

			return(
				<CarouselItem key={v4()} onClick={() => this.props.navigator.resetPage({component : UserInterestsSelector, key : v4()}) }>
					<div style={styles.addMore}>
						<ons-icon size='32px' style={styles.addMoreIcon} icon="ion-ios-plus-outline">
						</ons-icon>
					</div>
				</CarouselItem>	
			)
		
		}

		return (
			<CarouselItem style={styles.carouselItem} onClick={() => this.props.navigator.pushPage({component : ArchiveScreen,toggleLike : this.props.toggleLike,toggleBookmark : this.props.toggleBookmark,term : interest.term,key : v4()})} key={v4()}>
	      		<div style={{position : "relative"}}>
		      		<div className="image">
		        		{
		      				this.state.lazyLoaded.indexOf(index) !== -1 ?
		      				<img style={styles.featuredImage} src={interest.image} /> :
		      				<img style={styles.featuredImage} data-src={interest.image} /> 
		  	  			}
		  	  		</div>
		  	  		<div style={styles.overlay}>
		  	  		</div>
		  	  		<div style={styles.articleTitle}>
		  	  			{interest.label}
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
		const interests = this.props.interests.terms.filter(interest => interest.isSelected);
		let endIndex = itemsInViewport + activeIndex;
		endIndex = endIndex > interests.length - 1 ? interests.length - 1 : endIndex;
		this.lazyLoadImages.call(this,startIndex,endIndex);	
		
	}


	render(){

		let position = this.props.position || 0;
		let terms = this.props.interests.terms || [];

		position = parseInt(position);

		if(this.props.interests.loading){
			return (
				<CarouselLoader />
				)
		}

		return(
			<div>
				<p style={{position:'absolute',top : `${position}px`,left : '5px',fontWeight:'bold',color : 'rgb(255, 84, 124)'}}>Your Interests</p>
				<Carousel style={{top : `${position+30}px`,height : '90px' }} ref="carousel" direction="horizontal" onPostChange={this.postChange.bind(this)} itemWidth={screenWidth > 450 ? `120px` : `32%`} initialIndex="0" autoScroll overscrollable  autoRefresh fullscreen swipeable>
					{terms.filter((interest) => interest.isSelected).concat({term:'last'}).map(this.renderCarouselItem.bind(this))}
				</Carousel>
			</div>
		)
	}

}


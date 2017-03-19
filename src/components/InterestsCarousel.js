import React,{Component} from 'react';
import {Carousel,CarouselItem,ProgressBar} from 'react-onsenui';
import {fetchInterests} from '../actions/blogActions';
import {connect} from 'react-redux';
import {generateNavigationKey} from '../utils';
import ArchiveScreen from '../screens/ArchiveScreen';
import UserInterestsSelector from '../screens/UserInterestsSelector';

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
	    width: '90%',
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
	  	marginLeft : '15px'
	 },
	 addMoreIcon : {
	 	position : 'absolute',
	 	bottom   : '30px',
	 	left : '40px' 
	 }
};

class InterestsCarousel extends Component{ 

	componentDidMount(){
		this.props.fetchInterests();
	}

	renderCarouselItem(interest){
		if(interest.term == 'last'){
			let navigationKey = generateNavigationKey(`user-interests-selector-screen`);
			return(
				<CarouselItem key={interest.term} onClick={() => this.props.navigator.resetPage({component : UserInterestsSelector, key : navigationKey}) }>
					<div style={styles.addMore}>
						<ons-icon size='32px' style={styles.addMoreIcon} icon="ion-ios-plus-outline">
						</ons-icon>
					</div>
				</CarouselItem>	
			)
		
		}

		return (
			<CarouselItem style={styles.carouselItem} onClick={() => this.props.navigator.pushPage({component : ArchiveScreen,term : interest.term,key : generateNavigationKey(interest.term)})}  key={interest.term}>
	      		<div style={{position : "relative"}}>
		      		<div className="image">
		        		<img style={styles.featuredImage} src={interest.image} />
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

	render(){

		let position = this.props.position || 0;
		position = parseInt(position);

		if(this.props.interests.loading){
			return (
				<ProgressBar indeterminate />
				)
		}

		return(
			<div>
				<p style={{position:'absolute',top : `${position}px`,left : '15px',fontWeight:'bold',color : 'rgb(255, 84, 124)'}}>Explore</p>
				<Carousel style={{top : `${position+30}px`,height : '90px' }} ref="carousel" direction="horizontal" itemWidth="120px" initialIndex="0" overscrollable fullscreen swipeable>
					{this.props.interests.terms.filter((interest) => interest.isSelected).concat({term:'last'}).map(this.renderCarouselItem.bind(this))}
				</Carousel>
			</div>
		)
	}

}

const mapDispactorToProps = (dispatch) => { 
	return {
		fetchInterests : () => dispatch(fetchInterests())
}};

const mapStateToProps = (state,ownProps) => {
	return {
		interests : state.blog.interests
}};

export default connect(mapStateToProps,mapDispactorToProps)(InterestsCarousel);

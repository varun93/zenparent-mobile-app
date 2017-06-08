import React from 'react';
import {ProgressCircular} from 'react-onsenui';

const CarouselLoader = ({}) => {

	return (
		<div style={{height : "150px",position : "relative"}}>
			<ons-icon style={{color:"#8675a1",position : "absolute",top : "40%",left : "45%"}} size="30px" spin icon="md-spinner"></ons-icon>
		</div>
	);

};

export default CarouselLoader;
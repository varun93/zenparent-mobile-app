import React from 'react';
import {ProgressCircular} from 'react-onsenui';

const CarouselLoader = ({}) => {

	return (
		<div style={{height : "150px",position : "relative"}}>
			<ProgressCircular style={{position : "absolute",top : "40%",left : "40%"}} indeterminate />
		</div>
	);

};

export default CarouselLoader;
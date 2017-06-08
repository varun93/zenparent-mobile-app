import React from 'react';

const ScreenLoader = ({}) => {

	return (
		<div style={{position : "fixed",top : "40%",left : "45%"}}>
			<ons-icon style={{color:"#8675a1"}} size="30px" spin icon="md-spinner"></ons-icon>
		</div>
	);

};

export default ScreenLoader;